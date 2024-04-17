import React from "react";
import {
  CardContainer,
  CardImage,
  CardTitle,
  CardButton,
} from "../styles/StyledComponents";
import { Environment } from "../environment/index";

export const MovieCard = ({ movie, index, children }) => (
  <div className="col-sm-6 col-md-4 col-lg-4 mt-2">
    <CardContainer>
      <CardImage
        src={`${Environment.URL_IMAGEM}/${movie.poster_path}`}
        alt="movie"
      />

      <div>
        <CardTitle>{movie.title}</CardTitle>
        <CardButton
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target={`#staticBackdrop${index}`}
        >
          Saber mais
        </CardButton>
      </div>
      {children}
    </CardContainer>
  </div>
);
