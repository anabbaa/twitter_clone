import Button from "./Button"
import { CiHome, CiTwitter , CiHashtag    ,IoBookmarksOutline , 
CiUser , CiCircleMore } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";

const Aside = ()=>{

    const navItems = [
        {icon: <CiTwitter  />},
        { icon: <CiHome />, main: "Home" },
        { icon: <CiHashtag  />, main: "Explore" },
        { icon:  <IoMdNotificationsOutline  />, main: "Notifications" },
        { icon:   <FiMessageSquare/>, main: "Messages" },
        { icon: <CiUser   />, main: "Profile" },
        { icon: <CiCircleMore   />, main: "Profile" },
];
    
    return (
<aside className="bg-black h-[90vh] w-[15vw] text-white flex flex-col gap-8
justify-center items-center">
{navItems.map((item, index) => (
    <div key={index}
className="flex items-center gap-4 w-[10vw] hover:bg-gray-800 rounded"    > 
<span className="fw-[2vw]">
        {item.icon}
        </span>
        <h1 className="w-[8vw]">
        {item.main}
        </h1>
    </div>
))}

<button className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-bold 
px-10  flex-end rounded-full transition">
    Tweets
</button>
</aside>
    )

}
export default Aside