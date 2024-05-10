'use server'

import { ISort } from "./interfaces";

const options = {
  method: 'GET',
  headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
  }
};

export async function searchMovie(queryStr: ISort, page: number) {  
  if (queryStr.query) {
    const response = await searchByTitle(queryStr.query, page)
    return response
  } else {
    const queryString = (queryStr.primary_release_year ? `&primary_release_year=${queryStr.primary_release_year}` : '') 
                      + (queryStr.with_genres ? `&with_genres=${queryStr.with_genres}` : '') 
                      + (queryStr["vote_average.gte"] ? `&vote_average.gte=${queryStr["vote_average.gte"]}` : '') 
                      + (queryStr["vote_average.lte"] ? `&vote_average.lte=${queryStr["vote_average.lte"]}` : '') 
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
    const response=  await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    if (response.ok)  return await response.json()
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
      const videoData = await fetch(`https://api.themoviedb.org/3/movie/${id.toString()}/videos?language=en-US`, options)
      if (response.ok) {
        const description = await response.json()
        const video = await videoData.json()
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
