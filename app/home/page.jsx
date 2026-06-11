"use client";
import Aside from "../components/Aside";
import TwitterPages from "../tweets/page";
import Welcome from "../components/Welcome";

export default function Home() {

return (
<div className="flex w-[90vw] min-h-screen">
    <Aside></Aside>
    <div className="w-[60vw] flex flex-col gap-8 ">
        <Welcome />
        <TwitterPages />
    </div>
</div>
);
}