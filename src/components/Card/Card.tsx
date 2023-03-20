import { ICard } from "../../types"

interface CardProps {
  card: ICard
}

export const Card: React.FC<CardProps> = ({ card }) => {
  return <div>Card</div>
}
