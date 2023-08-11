import Image from 'next/image';
import AuthForm from './components/AuthForms';

export default function Home() {
  return (
  <div className='
  flex
  min-h-full
  justify-center
  flex-col
  py-12
  sm:px-6
  lg:px-8
  bg-gray-100
  '>
  <div className='sm:mx-auto sm:w-full sm:max-w-md'>
      <Image
      className='mx-auto w-auto'
      src='/images/main-logo.png'
      alt='logo'
      height={50}
      width={50}
      />
      <h2 className='
      mt-6
      text-center
      text-3xl
      font-bold
      tracking-tight
      text-gray-900
      '>
         Sign in your account
      </h2>
  </div>
  {/* AuthForm */}
  <AuthForm/>
  </div>);
}
