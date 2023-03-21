import { useEffect, useState } from "react"
import { HomeProvider } from "../../contexts/HomeContext"
import { CardList } from "../../components/CardList"
import { Controls } from "../../components/Controls"
import { ICard } from "../../types"

export type Status = "error" | "loading" | "success"

export const Home = () => {
  const [cards, setCards] = useState<ICard[]>([])
  const [status, setStatus] = useState<Status>("loading")

  const [search, setSearch] = useState<string>("")
  const [autoPaging, setAutoPaging] = useState<boolean>(false)
  const [limit, setLimit] = useState<string>("10")
  const [limitDisabled, setLimitDisabled] = useState<boolean>(false)

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/cards${limit && `?&_limit=${limit}`}${
            search && `&q=${search}`
          }`
        )
        if (!res.ok) {
          setStatus("error")
          throw new Error("failed to fetch")
        }
        const data = await res.json()
        setCards(data)
        setStatus("success")
      } catch (error: any) {
        console.log(error.message)
      }
    }
    fetchCards()
  }, [limit, search])
  return (
    <HomeProvider
      value={{
        autoPaging,
        search,
        limitDisabled,
        setSearch,
        setAutoPaging,
        setLimit,
      }}>
      <div className="home-wrapper">
        <div className="container">
          <Controls />
          <CardList cards={cards} status={status} />
        </div>
      </div>
    </HomeProvider>
  )
}
