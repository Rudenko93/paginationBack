import { memo } from "react"

import { Radio } from "../Radio"
import { Search } from "../Search"
import { Select } from "../Select"

export const Controls: React.FC = memo(() => {
  return (
    <div className="controls">
      <Search />
      <div>
        <Radio />
        <Select />
      </div>
    </div>
  )
})
