import { useHomeContext } from "../../contexts/HomeContext"

export const Radio: React.FC = () => {
  const { handleAutoPaging } = useHomeContext()

  return (
    <>
      <fieldset>
        Auto Paging
        <input
          className="input"
          type="radio"
          name="pagination"
          value="false"
          id="false"
          defaultChecked={true}
          onChange={() => handleAutoPaging(false)}
        />
        <label htmlFor="false">Off</label>
        <input
          type="radio"
          name="pagination"
          value="true"
          id="true"
          onChange={() => handleAutoPaging(true)}
        />
        <label htmlFor="true">On</label>
      </fieldset>
    </>
  )
}
