'use client'

import Avatar from '@/app/components/Avatar';
import { FullMessageType } from '@/app/types';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import ImageModal from './ImageModal';

interface MessageBoxpProps {
   message : FullMessageType
   isLast? : boolean

}

const MessageBox:React.FC<MessageBoxpProps> = ({
   message,
   isLast
}) => {
   const [imageModalOpen , setImageModalOpen] = useState(false)
   const session = useSession();

   const isOwn = session.data?.user?.email === message?.sender?.email;

   const seenList = (message.seen || [])
   .filter(user => user.email !== message?.sender?.email)
   .map(user => user.name)
   .join(', ');

   const container  = clsx(`
   flex gap-3 p-4
   `,
   isOwn && 'justify-end'
   )

   const avatar = clsx(isOwn && 'order-2')

   const body = clsx(
      'flex flex-col gap-2',
      isOwn && 'items-end'
      )

   const messageStyle = clsx(
      'text-sm w-fit overflow-hidden',
      isOwn ? 'bg-sky-400 text-white' : "bg-gray-100 text-slate-400",
      message.image ? "rounded-md p-0" : 'rounded-lg py-2 px-3'
      )  
   return (
     <div className={container}>
       <div className={avatar}>
         <Avatar user={message.sender} />
       </div>
       <div className={body}>
         <div className="flex items-center gap-1">
           <div className="text-sm text-gray-500">
             {message.sender.name + " :"}
           </div>
           <div className="text-xs text-gray-400">
             {format(new Date(message.createdAt), "p")}
           </div>
         </div>
         <div className={messageStyle}>
           <ImageModal
             src={message.image}
             isOpen={imageModalOpen}
             onClose={() => setImageModalOpen(false)}
           />
           {message.image ? (
             <Image
               onClick={() => setImageModalOpen(true)}
               className="object-cover cursor-pointer hover:scale-105 transition"
               width={200}
               height={200}
               src={message.image}
               alt={message.image}
             />
           ) : (
             <div>{message.body}</div>
           )}
         </div>
         {isLast && isOwn && seenList.length > 0 && (
           <div className="text-xs font-light text-gray-500">
             {`Seen by ${seenList}`}
           </div>
         )}
       </div>
     </div>
   );
}
 
export default MessageBox;