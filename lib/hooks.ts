import { useDispatch, useSelector, useStore } from '../node_modules/react-redux'
import type { AppDispatch, AppStore, RootState } from './store'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()