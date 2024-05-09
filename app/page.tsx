'use server'

import { getMoviesList } from "./actions"
import Home from "./components/Home"


async function getMovies() {
  const res = await getMoviesList()
  return res
}

const Main = async() => {
  const moviesList = await getMovies()
  
  return <Home  moviesList={moviesList} />
}

export default Main