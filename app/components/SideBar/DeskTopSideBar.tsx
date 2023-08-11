"use client";

import { useState } from "react";
import { User } from "@prisma/client";
import useRoutes from "@/app/hooks/useRoutes";

import DeskTopItem from "./DesktopIconSB";
import Avatar from "../Avatar";
import SettingsModal from './SettingsModal';

interface DeskTopSideBarProps {
  currentUser: User;
}

const DeskTopSideBar: React.FC<DeskTopSideBarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setisOpen] = useState(false);
  return (
    <>
    <SettingsModal
    currentUser={currentUser}
    isOpen={isOpen}
    onClose={() => setisOpen(false)}
    />
      <div
        className="
   hidden
   lg:fixed
   lg:inset-y-0
   lg:left-0
   lg:z-40
   lg:w-20
   xl:px-6
   lg:overflow-y-auto
   lg:bg-white
   lg:border-r
   lg:pb-4
   lg:flex
   lg:flex-col
   justify-between
     items-center
   "
      >
        <nav
          className="
      mt-4
      flex
      flex-col
      justify-between
    
      "
        >
          <ul
            role="list"
            className="
         flex
         flex-col
         items-center
         space-y-1
         "
          >
            {routes.map((item) => (
              <DeskTopItem
                key={item.label}
                href={item.href}
                icon={item.icon}
                label={item.label}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav
          className="
      w-20
      mt-4
      flex
      flex-col
      justify-between
      items-center
      "
        >
          <div
            onClick={() => setisOpen(true)}
            className="cursor-pointer opacity-75 hover:opacity-100 hover:scale-105 transition"
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default DeskTopSideBar;
