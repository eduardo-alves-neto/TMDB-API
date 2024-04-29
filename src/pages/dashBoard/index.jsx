import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { IMovieServices } from "./services/Services";
import { useSnackbar } from "notistack";
import { MovieCard } from "../../shared/components/MovieCard";
import { MovieModal } from "../../shared/components/MovieModal";
import { MovieCardFavorite } from "../../shared/components/MovieCardFavorite";
import { queryKey } from "./utils/queryKey";
import { Button, Grid, TextField, Typography } from "@mui/material";


export const MovieList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [dataLoaded, setDataLoaded] = useState(false);

  const { isLoading, data } = useQuery({
    queryKey: queryKey.movies,
    queryFn: async () => {
      try {
        const response = await IMovieServices.get();
        return response.results;
      } catch (error) {
        console.error("Error fetching movies:", error);
        enqueueSnackbar("Não foi possível obter os dados do servidor.", {
          variant: "error",
        });
        throw error;
      }
    },
    enabled: !dataLoaded,
    onSuccess: () => {
      setDataLoaded(true);
    },
  });

  const {
    isLoading: isLoadingFavorites,
    data: favoritesData,
    refetch,
  } = useQuery({
    queryKey: queryKey.favorites,
    queryFn: async () => {
      try {
        const response = await IMovieServices.getFavorites();
        return response.results;
      } catch (error) {
        console.error("Error fetching movies:", error);
        enqueueSnackbar("Não foi possível obter os favoritos.", {
          variant: "error",
        });
        throw error;
      }
    },
  });
  const { mutateAsync } = useMutation({
    mutationFn: async (values) => {
      try {
        await IMovieServices.create(values);
        enqueueSnackbar("Adicionado aos favoritos", { variant: "success" });
        refetch();
      } catch (error) {
        console.error(error);
        enqueueSnackbar("Ocorreu um erro ao salvar.", { variant: "error" });
      }
    },
  });

  const submit = (id) => {
    mutateAsync(id);
  };

  return (
    <Grid container spacing={2} sx={{ p: 3 ,height:'100vh'}}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          sizw="small"
          disabled
          placeholder="...."
          label="Search"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Button disabled>
          Pesquisar
        </Button>
      </Grid>

      <Grid item sx={{ marginY: 6, overflowX: 'auto', display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
        {isLoading ? (
          <Typography variant="h6">...Carregando</Typography> // colocar skeleton
        ) : (
          data?.map((movie, index) => (
            <Grid item xs={12} md={6} key={movie.id}>
              <MovieCard movie={movie} index={index}>
                <MovieModal movie={movie} index={index} submit={submit} />
              </MovieCard>
            </Grid>
          ))
        )}
      </Grid>
      <hr />

      <Grid item sx={12} md={12}>
        <Typography fontWeight={500} color='black' variant="h6">Favoritos</Typography>
      </Grid>

      <Grid item sx={{ marginY: 6, overflowX: 'auto', display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}  >
        {isLoadingFavorites ? (
          <Typography variant="h6">...Carregando</Typography>
        ) : (
          favoritesData?.map((movieF, indexF) => (
            <Grid item xs={12} md={6} key={movieF.id}>
              <MovieCardFavorite movie={movieF} index={indexF} />
            </Grid>
          ))
        )}
      </Grid>
    </Grid>
  );
};
