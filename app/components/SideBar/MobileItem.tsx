"use client";

import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
  label: string;
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
  label,
  href,
  icon : Icon,
  active,
  onClick,
}) => {
   const handleClick = () => {
      if(onClick) return onClick()
   }

  return (
   <Link
   className={clsx(`
   group
   flex
   gap-x-3
   leading-6
   font-semi-bold
   w-full
   justify-center
   p-4
   text-gray-500
   hover:text-black
   hover:bg-gray-100
   rounded-md
   `,
   active && 'bg-gray-300 text-black'
   )}
   onClick={onClick}
   href={href}

   >
      <Icon className='h-6 w-6'/>
   </Link>
   );
};

export default MobileItem;
