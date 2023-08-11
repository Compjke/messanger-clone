"use client";

import { useMemo, useState } from "react";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/inputs/AvatarGroup";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import useActiveList from '@/app/hooks/useActiveList';

interface HeaderConversationProps {
  conversation: Conversation & {
    users: User[];
  };
}

const HeaderConversation: React.FC<HeaderConversationProps> = ({
  conversation,
}) => {
  const [drawerOpen, setdrawerOpen] = useState(false);
  const otherUser = useOtherUser(conversation);
  const {members} = useActiveList()
  const isActive = members.indexOf(otherUser?.email!) !== -1;  
  
  
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? "Online" : "Offline";
  }, [conversation, isActive]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setdrawerOpen(false)}
      />
      <div
        className="
   bg-white
   w-full
   flex
   border-b
   border-gray-400
   sm:px-4
   py-3
   px-4
   lg:px-6
   justify-between
   items-center
   shadow-sm
   "
      >
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="lg:hidden 
         text-sky-400 hover:text-sky-600 transition cursor-pointer"
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div
              className="
            text-sm
            font-light
            text-neutral-500
            "
            >
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => setdrawerOpen(true)}
          className="
      text-sky-400
      cursor-pointer
      hover:text-sky-600
      transition
      hover:translate-y-1
      hover:scale-110
      "
        />
      </div>
    </>
  );
};

export default HeaderConversation;
