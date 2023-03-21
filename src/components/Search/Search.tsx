import { useState } from "react"

export const Search: React.FC = () => {
  const [search, setSearch] = useState<string>("")

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
