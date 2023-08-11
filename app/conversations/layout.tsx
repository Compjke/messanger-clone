import getConversations from '../actions/getConversations';
import getUsersList from '../actions/getUsersList';
import SideBar from '../components/SideBar/SideBar';
import ConversationList from './components/ConversationList';

const ConversationsLayout = async ({
   children
}: {
   children : React.ReactNode
}) => {

   const conversations = await getConversations()
   const users = await getUsersList();
   return ( 
  <SideBar>
   <div className='h-full'>
      <ConversationList
      initialItems={conversations}
      users={users}
      />
      {children}
   </div>
  </SideBar>
      );
}
 
export default ConversationsLayout;