import prisma from '@/app/libs/prismadb'
import getSesion from './getSession'


const getUsersList = async () => {
   const session = await getSesion();

   if(!session?.user?.email){
      return [];
   }

   try {
      const usersList = await prisma.user.findMany({
         orderBy : {
            creaedAt : 'desc'
         },
         where : {
            NOT : {
               email : session.user.email
            }
         }
      });

      return usersList;
   } catch (err : any) {
      return [];
   }
}

export default getUsersList;