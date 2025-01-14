import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Sidebar/Sidebar'
import DashboardNav from '../Components/DashboardNav/DashboardNav'

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex">

            {/* sidebar */}

            <div>
                <Sidebar></Sidebar>
            </div>


            {/* outlet */}
            <div className="flex-1 md:ml-64">
                <div>
                    <DashboardNav></DashboardNav>
                </div>
                <div className="p-5">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
  )
}

export default DashboardLayout