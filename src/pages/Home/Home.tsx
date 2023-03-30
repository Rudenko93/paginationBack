import { useEffect, useState, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios, { Axios } from "axios"
import { HomeProvider } from "../../contexts/HomeContext"
import { CardList } from "../../components/CardList"
import { Controls } from "../../components/Controls"
import { ICard } from "../../types"
import { useRenderCount } from "../../hooks/useRenderCount"
import { Pagination } from "../../components/Pagination"
import { useInView } from "react-intersection-observer"
import { useDebounce } from "use-debounce"

export type Status = "error" | "loading" | "success"

export const Home = () => {
  const [cards, setCards] = useState<ICard[]>([])
  const [status, setStatus] = useState<Status>("loading")

  const [autoPaging, setAutoPaging] = useState<boolean>(false)
  const [limit, setLimit] = useState<string>("20")

  const location = useLocation()

  const pageNumber = parseInt(location.search.split("=")[1])
    ? parseInt(location.search.split("=")[1])
    : 1

  const searchQuery = location.search.split("=")[3]
    ? location.search.split("=")[3]
    : ""

  const [currentPage, setCurrentPage] = useState<number>(pageNumber)
  const [pageCount, setPageCount] = useState<number>(1)
  const [search, setSearch] = useState<string>(searchQuery)
  const [debouncedSearch] = useDebounce(search, 500)
  const [totalDataCount, setTotalDataCount] = useState<number>(
    parseInt(limit) + 1
  )

  const navigate = useNavigate()

  const { ref, inView } = useInView({
    threshold: 0,
    // triggerOnce: true,
  })

  const refCount = useRef(2)

  useEffect(() => {
    console.log(`inView ${inView}`)
    if (autoPaging && debouncedSearch) {
      setCards(cards.filter((card) => card.title.includes(debouncedSearch)))
    }

    if (
      (inView && cards.length < totalDataCount) ||
      (inView && debouncedSearch)
    ) {
      console.log("Lazy")
      const fetchCards = async () => {
        try {
          const res = await axios(
            `http://localhost:5000/cards/?${`_page=${refCount.current++}`}${
              limit && `&_limit=${limit}`
            }${debouncedSearch && `&q=${debouncedSearch}`}`
          )
          if (!res.status) {
            setStatus("error")
            throw new Error("failed to fetch")
          }
          setTotalDataCount(res.headers["x-total-count"])
          setCards((prev) => [...prev, ...res.data])
        } catch (error: any) {
          console.log(error.message)
        }
      }
      fetchCards()
    }
  }, [inView, debouncedSearch])

  useEffect(() => {
    if (!autoPaging) {
      console.log("Usual Effect")
      const fetchCards = async () => {
        try {
          const res = await axios(
            `http://localhost:5000/cards/?${
              currentPage && `_page=${currentPage}`
            }${limit && `&_limit=${limit}`}${
              debouncedSearch && `&q=${debouncedSearch}`
            }`
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
    }
  }, [currentPage, limit, debouncedSearch, autoPaging])

  const handleAutoPaging = (boolean: boolean): void => {
    setAutoPaging(boolean)
    setLimit("20")
    if (!boolean) {
      setCurrentPage(2)
      return
    }
    setCurrentPage(0)
  }

  const handlePageChange = (event: Record<"selected", number>): void => {
    setCurrentPage(event.selected + 1)
    handleNavigate()
  }

  const handleNavigate = (): void =>
    navigate(
      `?${currentPage && `_page=${currentPage}`}${limit && `&_limit=${limit}`}${
        debouncedSearch && `&q=${debouncedSearch}`
      }`
      //Need for other query states`
    )

  return (
    <HomeProvider
      value={{
        search,
        autoPaging,
        setSearch,
        handleAutoPaging,
        setLimit,
      }}>
      <div className="home-wrapper">
        <div className="container">
          {useRenderCount()}
          <Controls />
          <CardList cards={cards} status={status} />
          {autoPaging ? (
            <h1 ref={ref}>Footer</h1>
          ) : (
            <Pagination
              pageCount={pageCount}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </HomeProvider>
  )
}
