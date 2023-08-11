import getUsersList from '../actions/getUsersList';
import SideBar from '../components/SideBar/SideBar';
import UsersList from './components/UsersList';


const UsersLayout = async ({children} : {
   children : React.ReactNode
}) => {

  const users = await getUsersList();

   return (
     <SideBar>
       <div className="h-full">
        <UsersList users={users}/>
         {children}
        </div>
     </SideBar>
   );
}
 
export default UsersLayout;