'use client'

import { Button, Flex, Text, Image } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import MoviesList from "../components/MoviesList";
import TitleSearch from "../components/TitleSearch";
import { IMovieDetail, ISort } from "../interfaces";
import Empty from "../components/Empty";

const Watched = () => {

    const router = useRouter()
    const [queryStr, setQueryStr] = useState<{query: string}>({query: ''})
    const [favoriteMovies, setFavoriteMovies] = useState<IMovieDetail[]>();
    const [filteredResults, setFilteredResults] = useState<IMovieDetail[] | undefined>();
    const [loading, setLoading] = useState<boolean>()

    useEffect(() => {
      setLoading(true)
      if (localStorage.getItem('ratedMovies')) {
        setFavoriteMovies(JSON.parse(localStorage.getItem('ratedMovies') || ''));
        setLoading(false)
      }
    },[])

    const handleSearch = (queryStr: ISort) => {
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
                ? (
                  <Empty text="You haven&rsquo;t rated any films yet" src="./assets/loading.svg" >
                    <Button bg={'#9854F6'} onClick={() => router.push('/')}>Go Home</Button>
                  </Empty>
                )
                : <MoviesList moviesList={filteredResults ? filteredResults : favoriteMovies} />
            }
        </>
    )

}

export default Watched