'use client'

import { Grid } from "@mantine/core"
import MovieCard from "./MovieCard"
import { memo } from "react"
import { IMovieDetail } from "../interfaces"

const MoviesList = ({moviesList, genres}: any) => {  
      return (
          <Grid mb={24} >
            {moviesList?.map((movie: IMovieDetail) => (
              <Grid.Col span={{base: 12, md: 6}} key={movie.id} >
                <MovieCard movie={movie} genres={genres}/>
              </Grid.Col>
            ))}
          </Grid>
      )
  }

export default MoviesList