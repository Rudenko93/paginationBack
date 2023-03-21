import { useState } from "react"

export const Select: React.FC = () => {
  const [limit, setLimit] = useState<string>("10")
  const [limitDisabled, setLimitDisabled] = useState<boolean>(false)

  return (
    <>
      <span>Page limit</span>
      <select
        value={limit}
        disabled={limitDisabled}
        onChange={(e) => setLimit(e.target.value)}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </>
  )
}
