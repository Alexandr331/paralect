'use client'

import { Button, Pagination, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MoviesList from "../components/MoviesList";
import WatchedSearch from "../components/WatchedSearch";
import { IMovieDetail, ISort } from "../lib/interfaces";
import Empty from "../components/Empty";

const Watched = () => {

    const router = useRouter()
    const [favoriteMovies, setFavoriteMovies] = useState<IMovieDetail[]>();
    const [favoriteMoviesList, setFavoriteMoviesList] = useState<IMovieDetail[]>();
    const [filteredResults, setFilteredResults] = useState<IMovieDetail[] | null>();
    const [pageTotal, setPageTotal] = useState<number>()
    const [pageValue, setPageValue] = useState<number>(1)

    const moviesPerPage = 6

    useEffect(() => {
      if (localStorage.getItem('ratedMovies')) {
        const movies = JSON.parse(localStorage.getItem('ratedMovies') || '');
        setFavoriteMoviesList(movies);
        const startIndex = 0;
        const endIndex = startIndex + moviesPerPage;
        setFavoriteMovies(movies ? movies.slice(startIndex, endIndex) : []);
        setPageTotal(Math.ceil(JSON.parse(localStorage.getItem('ratedMovies') || '').length / moviesPerPage));
      }
    },[])

    const handlePagination = (e: any) => {
      if (e==1) {
        const endIndex = 0 + moviesPerPage;
        const movies = favoriteMoviesList ? favoriteMoviesList.slice(0, endIndex) : [];
        setFavoriteMovies(movies);
      }
      else if (e>1) {
        const startIndex = (e - 1) * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;
        const movies = favoriteMoviesList ? favoriteMoviesList.slice(startIndex, endIndex) : [];
        setFavoriteMovies(movies);
      }
    }

    const handleSearch = (queryStr: ISort) => {
      const { original_title } = queryStr;
      if (original_title) {
          setFilteredResults(favoriteMovies?.filter((result) =>
            result.original_title.toLowerCase().includes(original_title.toLowerCase())
          ));
          setPageTotal(1)
      }
      else setFilteredResults(favoriteMovies);
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
            {filteredResults?.length === 0 && <Text size="lg" w={600}>Movie was not found</Text>}
            <Pagination size={"sm"} siblings={1} boundaries={1} c={'#9854F6'} ml={'auto'} w={'fit-content'} total={Number(pageTotal)} value={pageValue} onChange={
                  (e) => {
                    setPageValue(e)
                    handlePagination(e)
                  }
                  }/> 
        </>
    )

}

export default Watched