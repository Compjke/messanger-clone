'use client'

import React, {Fragment} from 'react'
import {Dialog ,Transition} from '@headlessui/react'
import {CircleLoader, ClipLoader} from 'react-spinners'



const LoadingModal = () => {
   return ( 
   <Transition.Root 
   show
   as={Fragment}
   >
      <Dialog
      as='div'
      className='relative z-50'
      onClose={() => {}}
      >
         <Transition.Child
         as={Fragment}
         enter='ease-out duration-500'
         enterFrom='opacity-0'
         enterTo='opacity-100'
         leave='ease-in duration-500'
         leaveFrom='opacity-100'
         leaveTo='opacity-0'
         >
            <div className='fixed inset-0 bg-opacity-40 bg-gray-100 transition-opacity'/>
         </Transition.Child>
         <div className='
         fixed
         inset-0
         z-10
         overflow-y-auto
         '>
            <div className='
               flex
               min-h-full
               items-center
               justify-center
               p-4
               text-center
            '>
               <Dialog.Panel 
               
               >
                  <ClipLoader size={80} color='#0284c7'/>
               </Dialog.Panel>
            </div>
         </div>
      </Dialog>
   </Transition.Root>  
   );
}
 
export default LoadingModal;