import { useEffect, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"
import { HomeProvider } from "../../contexts/HomeContext"
import { CardList } from "../../components/CardList"
import { Controls } from "../../components/Controls"
import { ICard } from "../../types"
import { useRenderCount } from "../../hooks/useRenderCount"
import { Pagination } from "../../components/Pagination"

export type Status = "error" | "loading" | "success"

export const Home = () => {
  const [cards, setCards] = useState<ICard[]>([])
  const [status, setStatus] = useState<Status>("loading")

  const [search, setSearch] = useState<string>("")
  const [autoPaging, setAutoPaging] = useState<boolean>(false)
  const [limit, setLimit] = useState<string>("20")
  const [limitDisabled, setLimitDisabled] = useState<boolean>(false)

  const location = useLocation()

  const pageNumber = parseInt(location.search.split("=")[1])
    ? parseInt(location.search.split("=")[1])
    : 1

  const [currentPage, setCurrentPage] = useState<number>(pageNumber)
  const [pageCount, setPageCount] = useState<number>(1)

  const navigate = useNavigate()
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios(
          `http://localhost:5000/cards/?${
            currentPage && `_page=${currentPage}`
          }${limit && `&_limit=${limit}`}${search && `&q=${search}`}`
        )

        if (!res.status) {
          setStatus("error")
          throw new Error("failed to fetch")
        }
        setCards(res.data)
        if (res.headers["x-total-count"] === "0") {
          setPageCount(1)
          setCurrentPage(1)
        } else {
          const newPageCount = Math.ceil(
            parseInt(res.headers["x-total-count"]) / parseInt(limit)
          )
          if (newPageCount < currentPage) {
            setPageCount(1)
            setCurrentPage(1)
          } else {
            setPageCount(newPageCount)
          }
          setStatus("success")
        }
      } catch (error: any) {
        console.log(error.message)
      }
    }
    fetchCards()
  }, [currentPage, limit, search])

  const handlePageChange = (event: Record<string, number>): void => {
    setCurrentPage(event.selected + 1)

    navigate(
      `?${currentPage && `_page=${currentPage}`}${limit && `&_limit=${limit}`}${
        search && `&q=${search}`
      }`
    )
  }

  return (
    <HomeProvider
      value={{
        autoPaging,
        limitDisabled,
        setSearch,
        setAutoPaging,
        setLimit,
      }}>
      <div className="home-wrapper">
        <div className="container">
          {useRenderCount()}
          <Controls />
          <CardList cards={cards} status={status} />
          <Pagination
            pageCount={pageCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </HomeProvider>
  )
}
