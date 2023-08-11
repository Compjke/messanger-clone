"use client";

import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface UserBoxProps {
  userData: User;
}

const UserBox: React.FC<UserBoxProps> = ({ userData }) => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);

  const handleClick = useCallback(() => {
    setisLoading(true);
    axios
      .post("/api/conversations", {
        userId: userData.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setisLoading(false));
  }, [userData, router]);

  return (
    <>
    {isLoading && (
      <LoadingModal />
    )}
      <div
        onClick={handleClick}
        className="
   w-full
   relative
   flex
   items-center
   space-x-3
   bg-white
   p-3
   hover:bg-neutral-200
   transition
   rounded-lg
   cursor-pointer
   "
      >
        <Avatar user={userData} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex items-center mb-1">
              <p className="text-sm font-medium text-gray-900">
                {userData.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
