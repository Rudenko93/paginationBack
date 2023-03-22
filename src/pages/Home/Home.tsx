import { useEffect, useState } from "react"
import { HomeProvider } from "../../contexts/HomeContext"
import { CardList } from "../../components/CardList"
import { Controls } from "../../components/Controls"
import { Pagination } from "../../components/Pagination"
import ReactPaginate from "react-paginate"
import { ICard } from "../../types"
import axios from "axios"

export type Status = "error" | "loading" | "success"

export const Home = () => {
  const [cards, setCards] = useState<ICard[]>([])
  const [status, setStatus] = useState<Status>("loading")

  const [search, setSearch] = useState<string>("")
  const [autoPaging, setAutoPaging] = useState<boolean>(false)
  const [limit, setLimit] = useState<string>("20")
  const [limitDisabled, setLimitDisabled] = useState<boolean>(false)

  const [pageCount, setPageCount] = useState<number>(0)

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios(
          `http://localhost:5000/cards${limit && `?&_limit=${limit}`}${
            search && `&q=${search}`
          }`
        )

        if (!res.status) {
          setStatus("error")
          throw new Error("failed to fetch")
        } else {
          setCards(res.data)
          setPageCount(
            Math.ceil(parseInt(res.headers["x-total-count"]) / parseInt(limit))
          )
          setStatus("success")
        }
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
          <ReactPaginate
            pageCount={pageCount}
            initialPage={1}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            onPageChange={() => ""}
            containerClassName="pagination"
            breakLinkClassName="page-num"
            activeLinkClassName="page-active"
            pageLinkClassName="page-num"
            nextLinkClassName="page-num"
            previousLinkClassName="page-num"
            previousLabel="&lt;"
            nextLabel="&gt;"
          />
        </div>
      </div>
    </HomeProvider>
  )
}
