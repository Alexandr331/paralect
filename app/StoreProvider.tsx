'use client'
import { useRef } from 'react'
import { Provider } from "react-redux"
import { makeStore, AppStore } from '../lib/store'
import { fetchMovies } from '@/lib/features/movies/moviesSlice'

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  // const storeRef = useRef<AppStore>()
  // if (!storeRef.current) {
  //   storeRef.current = makeStore()
  //   storeRef.current.dispatch(fetchMovies())
  // }
  const store = makeStore()

  return <Provider store={store}>{children}</Provider>
}