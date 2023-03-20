import { ICard } from "../../types"

interface CardProps {
  card: ICard
}

export const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className="card">
      <img src="https://via.placeholder.com/600/92c952" alt="img" />
      <h2>{card.title}</h2>
    </div>
  )
}
