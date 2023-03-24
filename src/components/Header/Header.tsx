import { Outlet } from "react-router-dom"
import { ModeSwitcher } from "../ModeSwitcher"

export const Header: React.FC = () => {
  return (
    <>
      <div className="header-wrapper">
        <div className="container">
          <div className="header">
            <h1>Header</h1>

            <ModeSwitcher />
          </div>
        </div>
      </div>
      <Outlet />
    </>
  )
}
