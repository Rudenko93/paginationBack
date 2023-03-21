import { useContext, useEffect, useState } from "react"
import { CardList } from "../../components/CardList"
import { Controls } from "../../components/Controls"
import { ICard } from "../../types"

export type Status = "error" | "loading" | "success"

export const Home = () => {
  const [cards, setCards] = useState<ICard[]>([])
  const [status, setStatus] = useState<Status>("loading")

  // const contolContext = useContext()

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("http://localhost:5000/cards?&_limit=20")
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
  }, [])
  return (
    <div className="home-wrapper">
      <div className="container">
        <Controls />
        <CardList cards={cards} status={status} />
      </div>
    </div>
  )
}
