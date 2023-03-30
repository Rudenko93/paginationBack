import { createContext, useContext } from "react"

interface IHomeContext {
  search: string
  autoPaging: boolean
  setSearch: (value: string) => void
  handleAutoPaging: (value: boolean) => void
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
