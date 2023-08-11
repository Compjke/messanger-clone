"use client";

import { useEffect, useRef, useState } from "react";
import useConversation from "@/app/hooks/useConverSation";
import { FullMessageType } from "@/app/types";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherCLient } from "@/app/libs/pusher";
import { find } from "lodash";

interface BodyConversationProps {
  initialMessages: FullMessageType[];
}

const BodyConversation: React.FC<BodyConversationProps> = ({
  initialMessages,
}) => {
  const [messages, setMessages] = useState(initialMessages);

  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherCLient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();
    
    const messagesHndler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage : FullMessageType) => {
      setMessages(current => current.map(curMessage => {
         if(curMessage.id === newMessage.id) {
            return newMessage
         }
         return curMessage
      }))
    }

    pusherCLient.bind("messages:new", messagesHndler);
    pusherCLient.bind("message:update" , updateMessageHandler)

    return () => {
      pusherCLient.unsubscribe(conversationId);
      pusherCLient.unbind("messages:new", messagesHndler);
      pusherCLient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId]);

  return (
    <div
      className="
   flex-1
   overflow-y-auto
   "
    >
      {messages.map((message, ind) => (
        <MessageBox
          key={message.id}
          isLast={ind === messages.length - 1}
          message={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
};

export default BodyConversation;
