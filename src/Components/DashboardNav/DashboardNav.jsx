import { RiLogoutCircleLine } from "react-icons/ri";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";

const DashboardNav = () => {
    const { user, logOut } = useAuth();
    const [role] = useRole();

    return (
        <div className="navbar bg-[#ddf5f3]">
            <div className="navbar-start md:ml-5">
                <h2 className="text-sm md:text-xl font-bold uppercase">{role} Dashboard</h2>
            </div>
            <div className="navbar-end md:mr-8">
                <div className="dropdown z-10 dropdown-hover dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-7 md:w-10 rounded-full" title={user.displayName}>
                            {/* Show user photo or a placeholder if photoURL is not available */}
                            <img alt={user.displayName} src={user.photoURL || "https://i.ibb.co/mvJmjx6/placeholder.jpg"} />
                        </div>
                    </div>
                    <ul tabIndex={0} className="dropdown-content space-y-2 z-[1] menu shadow bg-base-100 rounded-box w-56">
                        <li><button className="btn bg-[#ddf5f3] text-gray-800">{user.displayName}</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardNav;
