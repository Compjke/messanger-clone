"use client";

import Modal from "@/app/components/Modal";
import Button from '@/app/components/buttons/Button';
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  users,
}) => {
  const router = useRouter();
  const [isLodaing, setisLodaing] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setisLodaing(true);
    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then(() => {
        toast.success(`You create a group chat whis ${members.length} members`);
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Failed to create a group"))
      .finally(() => setisLodaing(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className=" space-y-12">
          <div
            className="
            border-b
            border-gray-900/10
            pb-12
            "
          >
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Create a chat whith more than 2 people
            </p>
            <div
              className="
               mt-10
               flex
               flex-col
               gap-y-8
               "
            >
              <Input
                register={register}
                id="name"
                label="Name"
                disabled={isLodaing}
                required
                errors={errors}
              />
              <Select
                disabled={isLodaing}
                label="Members"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) =>
                  setValue("members", value, {
                    shouldValidate: true,
                  })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div className='
        mt-6
        flex
        items-center
        justify-end
        gap-x-6
        '>
         <Button
         disabled={isLodaing}
         onClick={onClose}
         type='button'
         secondary
         
         >
            Cancel
         </Button>
         <Button
         disabled={isLodaing}
         type='submit'
         >
            Create group
         </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
