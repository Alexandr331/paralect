'use client'

import React, { useEffect, useState } from "react";
import { Sort, getMoviesList, getSortedMovies, searchMovie }  from '../actions'
import { Button, Grid, Group, Input, Loader, NumberInput, Pagination, Select, Text, } from "@mantine/core";
import { YearPickerInput } from "@mantine/dates"
import { genres } from "../genres";
import MoviesList from "../components/MoviesList";
import InputBox from "../components/InputBox";
import TitleSearch from "../components/TitleSearch";

export type Genres = {
  id: string,
  name: string
}

export interface MovieDetail {
    id: number
    original_title: string
    poster_path: string | null
    genre_ids: string[] | number[],
    release_date: string,
    vote_average: string,
    runtime: string,
    vote_count: string,
    budget: string,
    overview: string,
    genres: Genres[],
    production_companies: {id: string, logo_path: string, name: string, origin_country: string}[]
    user_rate?: number | string 
}



const Home = ({moviesList}: {moviesList: {results: MovieDetail[], page: number, total_pages: number}}) => {
  
    const [movies, setMovies] = useState<MovieDetail[]>([])
    const [loading, setLoading] = useState(true)
    const [queryStr, setQueryStr] = useState({})
    const [rateFrom, setRateFrom] = useState<number | string>(0)
    const [rateTo, setRateTo] = useState<number | string>(0)
    const [pageTotal, setPageTotal] = useState<number>()
    const [year, setYear] = useState<Date | null>(null)
    const [pageValue, setPageValue] = useState<number>(1)

    useEffect(() => {
      setMovies(moviesList.results)
      setPageTotal(moviesList.total_pages)
      setPageValue(moviesList.page)
      setLoading(false)
    }, [])
    
    const sortBy = async (sort: string) => {
      await getSortedMovies(sort).then(data => {
        setMovies(data.results)
        setPageTotal(data.total_pages)
        setPageValue(data.page)
        setLoading(false)
      })
    }
    
    const search = async (query: Sort, page?: number) => {
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
                <TitleSearch title="Movies" setQueryStr={setQueryStr} queryStr={queryStr} search={search}/>
                <Group display={'flex'}>
                  <Grid>
                    <Grid.Col span={{base: 12, md: 3,  sm: 6}}>
                        <InputBox label="Genres">
                          <Select 
                              data={[...genres]}
                              placeholder="Select genre"
                              onChange={(_value, option) => {
                                option ? setQueryStr(prev => ({...prev, 'with_genres': option.value})) : ''
                              }}
                              clearable
                            />
                        </InputBox>
                    </Grid.Col>
                    <Grid.Col span={{base: 12, md: 3,  sm: 6}}>
                      <InputBox label="Release year">
                          <YearPickerInput
                              clearable
                              placeholder="Select release year"
                              value={year}
                              onChange={(e) => {
                                setYear(e)
                                setQueryStr(prev => ({...prev, 'primary_release_year': e?.getFullYear()}))
                              }}
                            />
                        </InputBox>
                    </Grid.Col>
                    <Grid.Col span={{base: 12, md: 3, sm: 6}}>
                    <InputBox label="Rating">
                          <Group grow>
                              <NumberInput
                                placeholder="From"
                                min={0}
                                max={10}
                                value={rateFrom}
                                onChange={(e) => {
                                  setRateFrom(e)
                                  setQueryStr(prev => ({...prev, 'vote_average.gte': e}))
                                }}
                              />
                              <NumberInput
                                placeholder="To"
                                min={Number(rateFrom)}
                                max={10}
                                value={rateTo}
                                onChange={(e) => {
                                  setRateTo(e)
                                  setQueryStr(prev => ({...prev, 'vote_average.lte': e}))
                                }}
                              />
                            </Group>
                        </InputBox>
                    </Grid.Col>
                    <Grid.Col m={'auto'} ta={'center'} flex={'inline'} span={{base: 12, md: 3, sm: 6}}>
                      <Button p={0} variant="transparent" c={'#7B7C88'} fz={'sm'}
                        onClick={() => {
                          setQueryStr({})
                          setRateFrom(0)
                          setRateTo(0)
                          setYear(null)
                          // initialMoviesList()
                        }}
                      >Reset filter</Button>
                    </Grid.Col>
                    </Grid>
                    
                  </Group>
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
                <MoviesList moviesList={movies}/>
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
