import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { IMovieServices } from "./services/Services";
import { useSnackbar } from "notistack";
import { MovieCard } from "../../shared/components/MovieCard";
import { MovieModal } from "../../shared/components/MovieModal";
import { ButtonSearch, CardTitle } from "../../shared/styles/StyledComponents";

import { queryKey } from "./utils/queryKey";

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
    enabled: !dataLoaded,
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
    <div className="container p-3">
      <nav className="navbar">
        <div className="container-fluid">
          <form className="d-flex">
            <input
              disabled
              className="form-control me-2"
              type="search"
              placeholder="...."
              aria-label="Search"
            />
            <ButtonSearch type="submit" disabled>
              Pesquisar
            </ButtonSearch>
          </form>
        </div>
      </nav>
      <div className="row flex-nowrap overflow-auto">
        {isLoading ? (
          <CardTitle>...Carregando</CardTitle> // colocar skeleton
        ) : (
          data?.map((movie, index) => (
            <div className="col-sm-6 col-md-4 col-lg-4 mt-2" key={index}>
              <MovieCard movie={movie} index={index}>
                <MovieModal movie={movie} index={index} submit={submit} />
              </MovieCard>
            </div>
          ))
        )}
      </div>
      <hr />
      <CardTitle>Favoritos</CardTitle>

      <div className="row flex-nowrap overflow-auto">
        {isLoadingFavorites ? (
          <CardTitle>...Carregando</CardTitle>
        ) : (
          favoritesData?.map((movieF, indexF) => (
            <div className="col-sm-6 col-md-4 col-lg-4 mt-2" key={indexF}>
              <MovieCard movie={movieF} index={indexF}>
                <MovieModal movie={movieF} index={indexF} submit={submit} />
              </MovieCard>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
