import prisma from "@/app/libs/prismadb";

import getSesion from "./getSession";

export const getCurrentUser = async () => {
   try {
      const session = await getSesion()
      if(!session?.user?.email) return null;

      const currentUser = await prisma.user.findUnique({
         where : {
            email : session?.user.email as string
         }
      })

      if(!currentUser) return null;

      return currentUser;
   } catch (err : any) {
      return null;
   }
}