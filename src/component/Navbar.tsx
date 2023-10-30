import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Navbar = () => {
  const [Dark, setDark] = useState(false);

  function SwitchTheme() {
    document.documentElement.classList.toggle("dark");
    setDark(!Dark);
  }
  return (
    <div className="bg-LightMode-element shadow-md dark:bg-DarkMode-element dark:text-DarkMode-text">
      <div className="content flex justify-between gap-4 ">
        <h1 className="text-lg">Where in the world?</h1>
        <div
          className="flex cursor-pointer select-none items-center gap-1"
          onClick={SwitchTheme}
        >
          <MoonIcon className={!Dark ? "w-5" : "hidden w-4"} />
          <SunIcon className={Dark ? "w-5" : "hidden w-4"} />

          <h2 className=" text-sm ">{Dark ? "Light" : "Dark"}&nbsp;Mode</h2>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
