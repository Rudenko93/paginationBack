import { useHomeContext } from "../../contexts/HomeContext"

export const Select: React.FC = () => {
  const { autoPaging, setLimit } = useHomeContext()

  return (
    <>
      <span hidden={autoPaging}>Page limit</span>
      <select
        className="select"
        disabled={autoPaging}
        onChange={(e) => setLimit(e.target.value)}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </>
  )
}
