import { getCurrentUser } from '@/app/actions/getCurrentUser';
import DeskTopSideBar from './DeskTopSideBar';
import MobileFooter from './MobileFooter';

const SideBar = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  
  return (
    <div className="h-full">
      <DeskTopSideBar currentUser={currentUser!} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
};

export default SideBar;
