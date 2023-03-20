import { useState } from "react"
import { ICard } from "../../types"
import { Card } from "../Card"

export const CardList: React.FC = () => {
  const [cards, setCards] = useState<ICard[]>([])
  return (
    <div>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  )
}
