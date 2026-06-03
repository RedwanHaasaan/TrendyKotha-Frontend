import Image from "next/image";
import Logo from '../../../../public/logo.png';
import ProfileForm from "@/components/Form/ProfileForm";
export default function CreateProfilePage(){
    return(
       <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-12 rounded-lg flex flex-col">
                <div>
                    <Image src={Logo} alt="Trendy Kotha Logo" width={100} height={100} className="mx-auto"/>
                </div>
                <div className='text-center  flex flex-col gap-2 mb-8'>
                    <h1 className='text-6xl font-garamond text-title font-bold'>Create Profile</h1>
                    <p className='text-sm font-normal font-inter text-ancient'>Please fill in your details to create your profile.</p>
                </div>
                {/* Profile form will go here */}
                <ProfileForm/>
            </div>
       </div>
    )
}