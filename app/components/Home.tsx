'use client'

import React, { useEffect, useState } from "react";
import { getSortedMovies, searchMovie }  from '../lib/actions'
import { Input, Loader, Pagination, Select } from "@mantine/core";
import MoviesList from "../components/MoviesList";
import { IMovieDetail, ISort } from "../lib/interfaces";
import Empty from "./Empty";
import Form from "./Form";





const Home = ({moviesList}: {moviesList: {results: IMovieDetail[], page: number, total_pages: number}}) => {
  
    const [movies, setMovies] = useState<IMovieDetail[]>()
    const [loading, setLoading] = useState<boolean>(true)
    const [queryStr, setQueryStr] = useState({})
    const [pageTotal, setPageTotal] = useState<number>()
    const [pageValue, setPageValue] = useState<number>(1)

    useEffect(() => {
      setMovies(moviesList.results)
      setPageTotal(moviesList.total_pages)
      setPageValue(moviesList.page)
      setLoading(false)
    }, [moviesList.page, moviesList.total_pages, moviesList.results])
    
    const sortBy = async (sort: string) => {
      await getSortedMovies(sort).then(data => {
        setMovies(data.results)
        setPageTotal(data.total_pages)
        setPageValue(data.page)
        setLoading(false)
      })
    }
    
    const search = async (query: ISort, page?: number) => {
      await searchMovie(query, page ?? 1).then(data => {
        setMovies(data.results)
        setPageTotal(data.total_pages)
        setPageValue(data.page)
        setLoading(false)
      })
    }

    return (
      <> 
        {
          loading
            ? <Loader m={'auto'} display={'block'} size={'lg'} />
            : <>
                <Form heading="Movies" setLoading={setLoading} handleSearch={search}/>

                <Input.Wrapper
                      size="lg"
                      m={'0 0 24px auto'}
                      w={'fit-content'}
                      label="Sort by"
                    >
                      <Select 
                            name="sort" 
                            id="sort" 
                            onChange={(_value, option)=>sortBy(option.value)}
                            data={[
                              {value: 'upcoming', label: 'Upcoming'},
                              {value: 'popular', label: 'Popular'},
                              {value: 'top_rated', label: 'Top rated'},
                              {value: 'now_playing', label: 'Now playing'},
                            ]}
                            placeholder="Most popular"
                            w={'fit-content'}
                          />  
                </Input.Wrapper> 
                {
                  movies?.length !== 0
                  ? <MoviesList moviesList={movies} />
                  : <Empty text="We don&rsquo;t have such movies, look for another one" src="./assets/badSearch.svg"/>
                }  
                
                <Pagination size={"sm"} siblings={1} boundaries={1} c={'#9854F6'} ml={'auto'} w={'fit-content'} total={Number(pageTotal)} value={pageValue} onChange={
                  (e) => {
                    setPageValue(e)
                    search(queryStr, e)
                    }
                  }/> 
              </>
        }
      </>
    )
}

export default Home
