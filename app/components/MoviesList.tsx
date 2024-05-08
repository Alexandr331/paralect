'use client'

import { Grid } from "@mantine/core"
import MovieCard from "./MovieCard"
import { MovieDetail } from "../page"
import React from "react"


const MoviesList = React.memo( ({moviesList}: any) => {  
      return (
          <Grid mb={24}>
            {moviesList?.map((movie: MovieDetail) => (
              <Grid.Col span={6} key={movie.id} >
                <MovieCard movie={movie} />
              </Grid.Col>
            ))}
          </Grid>
      )
  }
)

MoviesList.displayName = 'MoviesList'

export default MoviesList