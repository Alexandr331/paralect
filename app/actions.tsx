'use server'

import { IGenres, IMovieDetail, ISort } from "./interfaces";

const options = {
  method: 'GET',
  headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
  }
};

export async function getGenres(url: string) {
  const res = await fetch(url, options)
  if (res.ok) {
    const genres = await res.json()
    return genres
  } else throw new Error(res.statusText)
}

export async function searchMovie(queryStr: ISort, page: number) {  
  if (queryStr.original_title) {
    const response = await searchByTitle(queryStr.original_title, page)
    return response
  } else {
    const formatYear = queryStr.primary_release_year?.getFullYear()
    const queryString = (formatYear ? `&primary_release_year=${formatYear}` : '') 
                      + (queryStr.with_genres ? `&with_genres=${queryStr.with_genres}` : '') 
                      + (queryStr.vote_averagegte ? `&vote_average.gte=${queryStr.vote_averagegte}` : '') 
                      + (queryStr.vote_averagelte ? `&vote_average.lte=${queryStr.vote_averagelte}` : '') 
                      + (page ? `&page=${page}` : '&page=1')
    const response = await searchWithParams(queryString)
    return response
  }
}

export async function searchByTitle(title: string, page: number | 1) {
    const queryString = title.replace(" ", "+").trim()
    const url = `https://api.themoviedb.org/3/search/movie?query=${queryString}&include_video=false&language=en-US&page=${page}`
    try {
      const response = await fetch(url, options)
      if (response.ok) return await response.json()
      else throw new Error(response.statusText)   
    } catch (error) {
      console.log(error);
    }
}

export async function getMoviesList() {
  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    if (response.ok ) return await response.json()
    else throw new Error(response.statusText)   
  } catch (error) {
    console.error(error);
  }
}

export async function getSortedMovies(sortBy: string) {
  try {
    const response=  await fetch(`https://api.themoviedb.org/3/movie/${sortBy}?language=en-US&page=1`, options)
    if (response.ok) return await response.json()
    else throw new Error(response.statusText) 
  } catch (error) {
      console.error(error);
  }
}

export async function getMovieDesc(id: string | string[]) {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id.toString()}?language=en-US`, options)
      const responseVideo = await fetch(`https://api.themoviedb.org/3/movie/${id.toString()}/videos?language=en-US`, options)
      if (response.ok && responseVideo.ok) {
        const description = await response.json()
        const video = await responseVideo.json()
        return {
          description,
          video,
        }
      }
      else throw new Error(response.statusText) 
    } catch (error) {
        console.error(error);
    }
}

export async function searchWithParams(str: string) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US${str}`, options)
    if (response.ok) return await response.json()
    else throw new Error(response.statusText) 
  } catch (error) {
      console.error(error);
  }
}
