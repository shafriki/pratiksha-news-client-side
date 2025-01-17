import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Sidebar/Sidebar'
import DashboardNav from '../Components/DashboardNav/DashboardNav'
import { Helmet } from 'react-helmet-async'

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex">
        <Helmet>
                <title>Dashboard | প্রতীক্ষা নিউজ</title>
        </Helmet>

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