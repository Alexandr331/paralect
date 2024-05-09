'use client'

import { Button, Flex, Text, Image } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import MoviesList from "../components/MoviesList";
import TitleSearch from "../components/TitleSearch";
import { Sort } from "../actions";
import { MovieDetail } from "../components/Home";

const Watched = () => {

    const router = useRouter()
    const [queryStr, setQueryStr] = useState<{query: string}>({query: ''})
    const [favoriteMovies, setFavoriteMovies] = useState<MovieDetail[]>();
    const [filteredResults, setFilteredResults] = useState<MovieDetail[] | undefined>();
    const [loading, setLoading] = useState<boolean>()

    useEffect(() => {
      setLoading(true)
      if (localStorage.getItem('ratedMovies')) {
        setFavoriteMovies(JSON.parse(localStorage.getItem('ratedMovies') || ''));
        setLoading(false)
      }
    },[])

    const handleSearch = (queryStr: Sort) => {
      const {query} = queryStr
      if (query) {
          setFilteredResults(favoriteMovies?.filter((result) =>
            result.original_title.toLowerCase().includes(query.toLowerCase())
          ))  
      }
      else setFilteredResults(favoriteMovies)
    };
  
    return (
      <>
        <TitleSearch title="Watched" setQueryStr={setQueryStr} queryStr={queryStr} search={handleSearch}/>
            {
                loading
                ?
                (
                    <Flex 
                    h={'100%'}
                    justify={'center'}
                    align={'center'}
                    direction={'column'}
                >
                    <Image h={300} w={400} src="./assets/loading.svg" alt="watchlist"/>
                    <Text mb={16} size="lg" fw={600}>You haven&rsquo;t rated any films yet</Text>
                    <Button bg={'#9854F6'} onClick={() => router.push('/')}>Go Home</Button>
                </Flex>
                )
                :
                <MoviesList moviesList={filteredResults ? filteredResults : favoriteMovies} />
            }
        </>
    )

}

export default Watched