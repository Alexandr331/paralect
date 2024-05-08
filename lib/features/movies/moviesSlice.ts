import { MovieDetail } from '@/app/page'
import { Sort, getMoviesList, searchByTitle, urlString } from '@/app/actions'


const options = {
  method: 'GET',
  headers: {
      accept: 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2NjZmZhYzkxNWM1Yjc0ODMwYWY1MzJiZjA1NTE4MyIsInN1YiI6IjY2MmE2M2FjNTBmN2NhMDBiNWM4OTJmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ie239o2-bMwl9IKovKs8R6d7Jk2LuynONJKqqEEDl1A`
  }
};

export function searchMovies(queryStr: Sort, page?: number) {  
  return async function searchMoviesThunk(dispatch: any) {
    const response = await urlString(queryStr, page ?? 1)
    dispatch({ type: 'fetchMovies', payload: response })
  }
}

export function fetchMovies() {
  return async function fetchMoviesThunk(dispatch: any) {
    // const response = await getMoviesList()
    try {
      const response=  await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
      if (response.ok) {
        const data = await response.json()
        dispatch({ type: 'fetchMovies', payload: data })
      }
      else throw new Error(response.statusText)   
    } catch (error) {
      console.error(error);
    }
    
  }
  
}

let initialState: {results: MovieDetail[], total_pages: number, page: number} = {results: [], total_pages: 0, page: 0}

export default function moviesReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'fetchMovies': {
      state = action.payload
      return state ?? null
    }
    default: 
    return state 
  }
}
