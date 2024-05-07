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

let initialState: MovieDetail[] = []

export default function moviesReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'fetchMovies': {
      return action.payload
    }
    default: 
    return state 
  }
}
