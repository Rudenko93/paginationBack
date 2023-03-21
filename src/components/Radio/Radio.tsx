import { useHomeContext } from "../../contexts/HomeContext"

export const Radio: React.FC = () => {
  const { setAutoPaging } = useHomeContext()

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
          onChange={() => setAutoPaging(false)}
        />
        <label htmlFor="false">Off</label>
        <input
          type="radio"
          name="pagination"
          value="true"
          id="true"
          onChange={() => setAutoPaging(true)}
        />
        <label htmlFor="true">On</label>
      </fieldset>
    </>
  )
}
