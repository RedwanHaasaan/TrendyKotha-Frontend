import Image from 'next/image';
import Logo from '../../../../public/logo.png';
import RegisterForm from '@/components/Form/RegisterForm';
import Link from 'next/link';
const Page = ()=>{
    return(
       <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-12 rounded-lg flex flex-col gap-8">
                <div>
                    <Image src={Logo} alt="Trendy Kotha Logo" width={100} height={100} className="mx-auto"/>
                </div>
                <div className='text-center flex flex-col gap-2'>
                    <h1 className='text-4xl font-garamond text-primary font-bold'>Join the Circle</h1>
                    <p className='text-base font-normal font-inter text-ancient'>Become a part of the digital manuscript.</p>
                </div>
                <RegisterForm/>
                <div>
                    <p className='text-sm font-inter text-ancient text-center'>Already in the circle?<Link href="/login" className='text-primary underline'> Enter here</Link></p>
                </div>
            </div>
       </div>
    )
};

export default Page;