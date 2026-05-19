import Image from 'next/image';
import Logo from '../../../../public/logo.png';
import LoginForm from '@/components/Form/LoginForm';
import Link from 'next/link';
const Page = ()=>{
    return(
       <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-12 rounded-lg flex flex-col gap-8">
                <div>
                    <Image src={Logo} alt="Trendy Kotha Logo" width={100} height={100} className="mx-auto"/>
                </div>
                <div className='text-center flex flex-col gap-2'>
                    <h1 className='text-6xl font-garamond text-title font-bold'>TrendyKotha</h1>
                    <p className='text-sm font-normal font-inter text-ancient'>Welcome back! Please log in to your account.</p>
                </div>
                <LoginForm/>
                <div>
                    <p className='text-sm font-inter text-ancient text-center'>Not yet Joined?<Link href="/register" className='text-primary underline'> Join The Circle</Link></p>
                </div>
            </div>
       </div>
    )
};

export default Page;