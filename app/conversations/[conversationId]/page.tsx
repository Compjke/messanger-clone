import getConversationById from '@/app/actions/getConversationById';
import { getMessages } from '@/app/actions/getMessages';
import EmptyState from '@/app/components/EmptyState';
import HeaderConversation from './components/Header';
import BodyConversation from './components/BodyConversation';
import FormForMessages from './components/FormForMessages';

interface ParamsConversationIdPage{
   conversationId : string;
}

const ConversationId = async ({params} : {params: ParamsConversationIdPage}) => {
   const conversation = await getConversationById(params.conversationId);
   const messages = await getMessages(params.conversationId);
   
   if(!conversation){
      return (
         <div className='lg:pl-80 h-full'>
            <div className='h-full flex flex-col'>
               <EmptyState/>
            </div>
         </div>
      )
   }
   return (
     <div className="lg:pl-80 h-full">
       <div
         className="
      h-full flex flex-col
      "
       >
         <HeaderConversation conversation={conversation} />
         <BodyConversation
         initialMessages={messages}
         />
         <FormForMessages/>
       </div>
     </div>
   );
}
 
export default ConversationId;