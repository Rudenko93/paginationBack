import { CardList } from "../../components/CardList"
import { Controls } from "../../components/Controls"

export const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="container">
        <Controls />
        <CardList />
      </div>
    </div>
  )
}
