import { createContext, useContext } from "react"

interface IHomeContext {
  autoPaging: boolean
  search: string
  limitDisabled: boolean
  setSearch: (value: string) => void
  setAutoPaging: (value: boolean) => void
  setLimit: (value: string) => void
}

const HomeContext = createContext<IHomeContext | null>(null)

export const HomeProvider = HomeContext.Provider

export const useHomeContext = () => {
  const data = useContext(HomeContext)

  if (!data) {
    throw new Error("Can not `useHomeContext` outside of the `HomeProvider`")
  }

  return data
}
