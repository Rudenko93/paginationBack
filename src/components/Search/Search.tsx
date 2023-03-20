import { useState } from "react"

export const Search: React.FC = () => {
  const [search, setSearch] = useState<string>("")

  return (
    <>
      <input
        placeholder="search.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  )
}
