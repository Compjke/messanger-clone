"use client";

import Modal from "@/app/components/Modal";
import useConversation from "@/app/hooks/useConverSation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
import {Dialog} from '@headlessui/react'
import Button from '@/app/components/buttons/Button';
interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLodanig, setisLodanig] = useState(false);

  const onDelete = useCallback(() => {
    setisLodanig(true);
    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push("/conversations");
        router.refresh();
      })
      .catch(() => toast.error("Failed to delete", { duration: 2000 }))
      .finally(() => setisLodanig(false));
  }, [conversationId, onClose, router]);

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="sm:flex sm:items-start ">
        <div
          className="
         mx-auto
         flex
         h-12
         w-12
         flex-shrink-0
         items-center
         justify-center
         rounded-full
         bg-red-100
         sm:mx-0
         sm:h-10
         sm:w-10

         "
        >
          <FiAlertTriangle className="h-6 w-6 text-red-500" />
        </div>
        <div className='
        mt-3
        text-center
        sm:ml-4
        sm:mt-0
        sm:text-left

        '>
         <Dialog.Title
         as='h3'
         className='
            text-base
            font-semibold
            leading-6
            text-gray-700
         '
         >
            Delete conversation?
         </Dialog.Title>
         <div className='
         mt-2

         '>
            <p className='text-sm text-gray-500'>Are you sure?</p>
         </div>
        </div>
      </div>
      <div className='
      mt-5 
      sm:mt-4
      sm:flex
      sm:flex-row-reverse
      '>
         <Button
         disabled={isLodanig}
         danger
         onClick={onDelete}
         >
            Delete
         </Button>
         <Button
         disabled={isLodanig}
         secondary
         onClick={onClose}
         >
            Cancel
         </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
