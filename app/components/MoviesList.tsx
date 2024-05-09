'use client'

import { Grid } from "@mantine/core"
import MovieCard from "./MovieCard"
import React from "react"
import { MovieDetail } from "./Home"


const MoviesList = React.memo( ({moviesList}: any) => {  
      return (
          <Grid mb={24} >
            {moviesList?.map((movie: MovieDetail) => (
              <Grid.Col span={{base: 12, md: 6}} key={movie.id} >
                <MovieCard movie={movie} />
              </Grid.Col>
            ))}
          </Grid>
      )
  }
)

MoviesList.displayName = 'MoviesList'

export default MoviesList