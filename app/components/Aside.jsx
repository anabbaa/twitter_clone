import Button from "./Button"
import { CiHome, CiTwitter , CiHashtag    ,IoBookmarksOutline , 
CiUser , CiCircleMore } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import {useRouter} from "next/navigation"

const Aside = ()=>{
    const {logout} = useAuth()
    const router = useRouter()

    const handleLogout = async () => {
        window.location.href = "/signin";
        await logout(); 
    }

    const navItems = [
        {icon: <CiTwitter  />},
        { icon: <CiHome />, main: "Home" },
        { icon: <CiHashtag  />, main: "Explore" },
        { icon:  <IoMdNotificationsOutline  />, main: "Notifications" },
        { icon:   <FiMessageSquare/>, main: "Messages" },
        { icon: <CiUser/>, main: "Profile" },
        { icon: <CiCircleMore   />, main: "More" },
];
    
return (
<aside className="bg-black text-white w-[22%] lg:w-[10%] min-w-[180px] max-w-[260px] h-screen
    flex flex-col px-3 py-4 overflow-hidden">

    {/* NAV ITEMS */}
    <div className="flex flex-col gap-7 overflow-y-auto flex-1 pr-1">

    {navItems.map((item, index) => (
        <div
        key={index}
        className="
            flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 cursor-pointer transition"
            onClick={() => {
            if (item.main === "Profile") router.push("/profile");
            if (item.main === "Home") router.push("/home");
            }}
        >
            <span className="text-xl flex-shrink-0">
            {item.icon}
            </span>
            
            <h1 className="text-sm font-medium">
            {item.main}
            </h1>
        </div>
    ))}

    </div>

    {/* BOTTOM ACTIONS */}
    <div className=" flex flex-col gap-3 pt-3 border-t border-gray-800">

    <Button
        className=" bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-bold w-full py-2 rounded-full
        text-sm"
    >
        Tweets
    </Button>

    <Button
        onClick={handleLogout}
        className=" bg-gray-800 hover:bg-red-500 text-white font-bold w-full py-2
        rounded-full text-sm "
    >
        Sign Out
    </Button>

    </div>

</aside>
);

}
export default Aside