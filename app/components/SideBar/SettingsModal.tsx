'use client'

import { useState } from 'react';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Modal from '../Modal';
import Input from '../inputs/Input';
import Image from 'next/image';
import {CldUploadButton} from 'next-cloudinary'
import Button from '../buttons/Button';

interface SettingsModalProps {
   isOpen? : boolean
   onClose : () => void;
   currentUser : User;
}

const SettingsModal:React.FC<SettingsModalProps> = ({
   isOpen,
   onClose,
   currentUser
}) => {

   const router = useRouter();
   const [isLodading, setIsLoading] = useState(false);

   const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState : {
         errors,
      }
   } = useForm<FieldValues>({
      defaultValues : {
         name : currentUser?.name,
         image : currentUser?.image
      }
   })

   const image = watch('image');

   const handleUpload = (result:any) => {
      setValue('image' , result?.info?.secure_url, {
         shouldValidate : true
      })
   }

   const onSumit : SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true)
      axios.post('/api/settings',data)
      .then(() => {
         toast.success('Success' , {duration : 2000})
         router.refresh()
         onClose()
      })
      .catch(() => toast.error('Failed to upload user data', {position : 'bottom-right'}))
      .finally(() => setIsLoading(false))
   } 

   return (
     <Modal isOpen={isOpen} onClose={onClose}>
       <form onSubmit={handleSubmit(onSumit)}>
         <div
           className="
         space-y-12
         "
         >
           <div
             className="
            border-b
            border-gray-900/10
            pb-12
            "
           >
             <h2 className="text-base font-semibold leading-7 text-gray-800">
               Profile
             </h2>
             <p
               className="
               mt-1
               text-sm
               leading-6
               text-gray-600
               "
             >
               You can edit your public information here.
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
                 disabled={isLodading}
                 label="Name"
                 id="name"
                 required
                 errors={errors}
                 register={register}
               />
               <div>
                 <label
                   className="
                     block
                     text-sm
                     font-medium
                     leading-6
                     text-gray-900
                     "
                 >
                   Avatar
                 </label>
                 <div
                   className="
                     mt-2
                     flex
                     items-center
                     gap-x-3
                     "
                 >
                   <Image
                     alt="User avatar"
                     src={
                       image ||
                       currentUser?.image ||
                       "/images/placeholder_user.webp"
                     }
                     width={50}
                     height={50}
                     className="rounded-full"
                   />
                   <CldUploadButton
                     options={{ maxFiles: 1 }}
                     onUpload={handleUpload}
                     uploadPreset="xo0mzkxp"
                   >

                     <Button 
                     disabled={isLodading}
                     secondary
                     type='button'

                     >
                        Change avatar
                     </Button>
                   </CldUploadButton>
                 </div>
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
            disabled={isLodading}
            secondary
            onClick={onClose}
            >
               Cancel
            </Button>
            <Button
            disabled={isLodading}
            type='submit'
            >
               Save
            </Button>
           </div>
         </div>
       </form>
     </Modal>
   );
}
 
export default SettingsModal;