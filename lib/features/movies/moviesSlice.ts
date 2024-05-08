import { MovieDetail } from '@/app/page'
import { Sort, getMoviesList, searchByTitle, urlString } from '@/app/actions'

export function searchMovies(queryStr: Sort, page?: number) {  
  return async function searchMoviesThunk(dispatch: any) {
    const response = await urlString(queryStr, page ?? 1)
    dispatch({ type: 'fetchMovies', payload: response })
  }
}

export function fetchMovies() {
  return async function fetchMoviesThunk(dispatch: any) {
    const response = await getMoviesList()
    dispatch({ type: 'fetchMovies', payload: response })
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
