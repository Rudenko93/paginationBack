import { useHomeContext } from "../../contexts/HomeContext"

export const Search: React.FC = () => {
  const { search, setSearch } = useHomeContext()
  return (
    <>
      <input
        placeholder="search.."
        value={search}
        type="text"
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  )
}
