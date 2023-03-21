import { memo } from "react"
import { Status } from "../../pages/Home"
import { ICard } from "../../types"
import { Card } from "../Card"

interface ICardListProps {
  cards: ICard[]
  status: Status
}

export const CardList: React.FC<ICardListProps> = memo(({ cards, status }) => {
  const render = () => {
    switch (status) {
      case "loading":
        return <h1>Loading...</h1>
      case "error":
        return <h1>error...</h1>
      case "success":
        if (cards.length === 0) return <h1>No matches..</h1>
        return cards.map((card) => <Card key={card.id} card={card} />)
    }
  }

  return <div className="card-list">{render()}</div>
})
