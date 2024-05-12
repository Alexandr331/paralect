'use server'

import { Loader } from "@mantine/core"
import { getMoviesList } from "./lib/actions"
import Home from "./components/Home"


async function getMovies() {
  const res = await getMoviesList()
  return res
}

const Main = async() => {
  const data = await getMovies()
  
  return (
    data ? <Home  moviesList={data} /> : <Loader />
  )
}

export default Main