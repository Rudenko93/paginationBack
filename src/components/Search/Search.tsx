import { useHomeContext } from "../../contexts/HomeContext"

export const Search: React.FC = () => {
  const { setSearch } = useHomeContext()
  return (
    <>
      <input
        placeholder="search.."
        type="text"
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  )
}
