import { useState } from "react"

export const Select: React.FC = () => {
  const [selected, setSelected] = useState<string>("orange")

  return (
    <>
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange</option>
      </select>
    </>
  )
}
