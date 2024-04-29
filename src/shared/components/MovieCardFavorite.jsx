import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import { Environment } from "../environment/index";

export const MovieCardFavorite = ({ movie, index }) => (
  <Card sx={{ maxWidth: '100%', width: '20rem', marginX: 4 }}>
    <CardMedia
      component="img"
      height="320"
      image={`${Environment.URL_IMAGEM}/${movie.poster_path}`}
      alt="movie"
    />
    <CardContent>
      <Typography sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {movie.title}
      </Typography>
    </CardContent>
  </Card>
);