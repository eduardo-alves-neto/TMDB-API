import styled from "styled-components";
import { IMovieServices } from "./services/Services";
import { useMutation, useQuery } from "react-query";
import { queryKey } from "./utils/queryKey";
import { Environment } from "../../shared/environment/index";
import React, { useState } from "react";
import { useSnackbar } from "notistack";

export const MovieList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [imageLoaded, setImageLoaded] = useState(false);
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

  const { mutateAsync } = useMutation({
    mutationFn: async (values) => {
      try {
        await IMovieServices.create(values);
        enqueueSnackbar("Adicionado aos favoritos", { variant: "success" });
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
      <div className="row flex-nowrap overflow-auto">
        {isLoading ? (
          <SkeletonContainer />
        ) : (
          data?.map((movie, index) => (
            <div className="col-sm-6 col-md-4 col-lg-4 mt-2" key={index}>
              <CardContainer>
                {imageLoaded ? (
                  <SkeletonContainer />
                ) : (
                  <CardImage
                    src={`${Environment.URL_IMAGEM}/${movie.poster_path}`}
                    alt="movie"
                    onLoad={() => setImageLoaded(true)}
                  />
                )}

                <div>
                  <CardTitle>{movie.title}</CardTitle>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target={`#staticBackdrop${index}`}
                  >
                    Saber mais
                  </button>
                </div>
                {/* Modal */}
                <div
                  className="modal fade"
                  id={`staticBackdrop${index}`}
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                          <CardTitle>{movie.title}</CardTitle>
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body" style={{ color: "black" }}>
                        <Description>{movie.overview}</Description>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-bs-dismiss="modal"
                          onClick={() => submit(movie.id)}
                        >
                          Favoritar
                        </button>

                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Modal */}
              </CardContainer>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const SkeletonContainer = styled.div`
  width: 15rem;
  height: 20rem;
  margin: 2rem 1rem;
  padding: 1rem;
  border: 1px solid red;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15rem;
  margin: 2rem 2rem 2rem 1rem;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h5`
  color: "black";
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const CardButton = styled.a`
  background-color: #007bff;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
`;
const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: black;
`;
