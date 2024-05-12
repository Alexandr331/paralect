'use client'

import { Button, Loader, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MoviesList from "../components/MoviesList";
import WatchedSearch from "../components/WatchedSearch";
import { IMovieDetail, ISort } from "../lib/interfaces";
import Empty from "../components/Empty";

const Watched = () => {

    const router = useRouter()
    const [favoriteMovies, setFavoriteMovies] = useState<IMovieDetail[]>();
    const [filteredResults, setFilteredResults] = useState<IMovieDetail[] | null>();

    useEffect(() => {
      if (localStorage.getItem('ratedMovies')) {
        setFavoriteMovies(JSON.parse(localStorage.getItem('ratedMovies') || ''));
      }
    },[])

    const handleSearch = (queryStr: ISort) => {
      const { original_title } = queryStr
      if (original_title) {
          setFilteredResults(favoriteMovies?.filter((result) =>
            result.original_title.toLowerCase().includes(original_title.toLowerCase())
          )) 
      }
      else setFilteredResults(favoriteMovies)
    };
  
    return (
      <>
        <WatchedSearch heading="Watched" search={handleSearch}/>
            {
                favoriteMovies
                  ? <MoviesList moviesList={filteredResults || favoriteMovies}/> 
                  : (
                    <Empty text="You haven&rsquo;t rated any films yet" src="./assets/loading.svg" >
                      <Button bg={'#9854F6'} onClick={() => router.push('/')}>Go Home</Button>
                    </Empty>
                  )
                
                  
                }
                {filteredResults?.length === 0 ? <Text size="lg">Movie not found</Text> : <></>
                }
        </>
    )

}

export default Watched