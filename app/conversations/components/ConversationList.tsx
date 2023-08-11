"use client";

import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import useConversation from "@/app/hooks/useConverSation";
import { FullConversationType } from "@/app/types";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import GroupChatModal from './GroupChatModal';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { pusherCLient } from '@/app/libs/pusher';
import { find } from 'lodash';

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  users
}) => {
  const [items, setitems] = useState(initialItems);
  const [isModalOpen, setisModalOpen] = useState(false);
  const router = useRouter();
  const { isOpen, conversationId } = useConversation();
  const session = useSession();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email
  },[session.data?.user?.email])

  useEffect(() => {
    if(!pusherKey){
      return;
    }
    const newHandler = (conversation : FullConversationType) => {
      setitems(prev => {
        if(find(prev, {id : conversationId})){
          return prev;
        }
        return [conversation, ...prev]
      })
    }
    const updateHandler = (conversation: FullConversationType) => {
      setitems(prev => prev.map(currentConversation => {
        if(conversation.id === currentConversation.id){
          return {
            ...currentConversation,
            messages : conversation.messages
          }
        }
        return currentConversation
      }))
    }
    const removeHandler = (conversation : FullConversationType) => {
      setitems(prev => {
        return [...prev.filter(convers => convers.id !== conversation.id)]
      })
      if(conversationId === conversation.id){
        router.push('/conversations')
      }
    }

    pusherCLient.subscribe(pusherKey)

    pusherCLient.bind('conversation:new' , newHandler)
    pusherCLient.bind('conversation:update', updateHandler)
    pusherCLient.bind('conversation:remove', removeHandler)
   return () => {
    pusherCLient.unsubscribe(pusherKey);
    pusherCLient.unbind("conversation:new", newHandler);
    pusherCLient.unbind("conversation:update", updateHandler);
     pusherCLient.unbind("conversation:remove", removeHandler);
  }
  },[conversationId, pusherKey, router])


  return (
    <>
    <GroupChatModal
    isOpen={isModalOpen}
    onClose={() => setisModalOpen(false)}
    users={users}
    />
    <aside
      className={clsx(
        `
      fixed 
      inset-y-0
      pb-20
      lg:pb-0
      lg:left-20
      lg:w-80
      lg:block
      overflow-y-auto
      border-r
      border-gray-200

      `,
        isOpen ? "hidden" : "block w-full left-0"
      )}
    >
      <div className="px-5">
        <div
          className="
            flex
            justify-between
            mb-4
            pt-4
            "
        >
          <div
            className="
               text-2xl
               font-bold
               text-neutral-800
               "
          >
            Messages
          </div>
          <div
          onClick={() => {setisModalOpen(true)}}
          className="
          rounded-full
          p-2
          bg-gray-100
          text-gray-600
          cursor-pointer
          hover:bg-gray-300
          hover:scale-105
          transition
          "
          >
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {items.map((item) => (
          <ConversationBox
            key={item.id}
            data={item}
            selected={conversationId === item.id}
          />
        ))}
      </div>
    </aside>
    </>
  );
};

export default ConversationList;
