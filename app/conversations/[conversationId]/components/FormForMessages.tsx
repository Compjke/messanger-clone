'use client'

import useConversation from '@/app/hooks/useConverSation';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import MessageInput from './MessageInput';
import { CldUploadButton } from 'next-cloudinary';

const FormForMessages = () => {
   const {conversationId} = useConversation()
   const {
      register,
      setValue,
      handleSubmit,
      formState : {
         errors
      }
   } = useForm<FieldValues>({
      defaultValues : {
         message : ''
      }
   })

   const onSubmitMessageHandler : SubmitHandler<FieldValues> = (
      data
   ) => {
      setValue('message', '' , {shouldValidate : true})
      
      axios.post('/api/messages', {
         ...data,
         conversationId
      })
   };

   const handleUploadImage = (result : any) => {
      axios.post('/api/messages' , {
         image : result?.info?.secure_url,
         conversationId
      })
   }

   return (
     <div
       className="
   py-4 
   px-4 
   bg-white 
   border-t 
   flex
   items-center
   gap-2
   lg:gap-4
   w-full
   "
     >
       <CldUploadButton
         options={{ maxFiles: 1 }}
         onUpload={handleUploadImage}
         uploadPreset="xo0mzkxp"
       >
         <HiPhoto size={30} className="text-sky-400" />
       </CldUploadButton>
       <form
         onSubmit={handleSubmit(onSubmitMessageHandler)}
         className="
      flex
      items-center
      gap-2
      lg:gap-4
      w-full
      "
       >
         <MessageInput
           id="message"
           register={register}
           errors={errors}
           required
           placeholder={"Type your message..."}
         />
         <button
           className="
         rounded-lg
         px-4
         py-[11px]
         bg-sky-400
         opacity-80
         hover:opacity-100
         transition
         cursor-pointer
         "
           type="submit"
         >
           <HiPaperAirplane size={18} className="text-white" />
         </button>
       </form>
     </div>
   );
}
 
export default FormForMessages;