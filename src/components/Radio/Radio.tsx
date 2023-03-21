import { useState } from "react"

export const Radio: React.FC = () => {
  const [autoPaging, setAutoPaging] = useState<string>("false")
  return (
    <>
      <fieldset>
        Auto Paging
        <input
          type="radio"
          name="pagination"
          value="false"
          id="false"
          defaultChecked={true}
          onChange={() => setAutoPaging("false")}
        />
        <label htmlFor="false">False</label>
        <input
          type="radio"
          name="pagination"
          value="true"
          id="true"
          onChange={() => setAutoPaging("true")}
        />
        <label htmlFor="true">True</label>
      </fieldset>
    </>
  )
}
