import Image from 'next/image'
import React from 'react'

const Profile = () => {
  return (
    <div className='min-h-screen w-3/12 bg-black p-5 2xl:p-10 flex flex-col justify-start items-center gap-20'>
        <div className='flex flex-row justify-start items-center gap-3'>
            <div className='bg-white h-8 w-2'></div>
            <div className='text-2xl font-bold text-white tracking-wider'>SUPERJOIN TASK</div>
        </div>
        <div className='flex flex-col justify-center items-center gap-5'>
            <div className='rounded-full overflow-hidden border-3 border-white h-[200px] w-[200px]'>
                <Image src="/images/Ram.jpg" alt='profile' height={200} width={200} className='object-cover'/>
            </div>
            <div className='flex flex-col justify-center items-center gap-3'>
                <h1 className='text-xl font-bold text-white'>Tanniru Leela Sai Ram</h1>
                <p className='text-md font-semibold text-[#fff]'>21BCE9789</p>
            </div>
        </div>
        <div className='flex flex-col gap-5 justify-center items-start text-white'>
            <a className='flex flex-row gap-5 justify-center items-center' href='https://ram-tanniru.vercel.app/'>
                <Image src='/icons/web.svg' height={25} width={25} alt='logo'/>
                <p className='text-lg font-semibold'>Portfolio</p>
            </a>
            <a className='flex flex-row gap-5 justify-center items-center' href='https://github.com/ramtanniru'>
                <Image src='/icons/github.png' height={25} width={25} alt='logo'/>
                <p className='text-lg font-semibold'>Github</p>
            </a>
            <a className='flex flex-row gap-5 justify-center items-center' href='https://leetcode.com/u/ram_tanniru/'>
                <Image src='/icons/leetcode.png' height={25} width={25} alt='logo'/>
                <p className='text-lg font-semibold'>Leetcode</p>
            </a>
            <a className='flex flex-row gap-5 justify-center items-center' href='https://www.geeksforgeeks.org/user/ramtanniru2/'>
                <Image src='/icons/gfg.png' height={30} width={30} alt='logo'/>
                <p className='text-lg font-semibold'>Geeks for Geeks</p>
            </a>
            <a className='flex flex-row gap-5 justify-center items-center' href='https://www.linkedin.com/in/ram-tanniru-12b35b222/'>
                <Image src='/icons/linkedin.png' height={25} width={25} alt='logo'/>
                <p className='text-lg font-semibold'>Linked In</p>
            </a>
        </div>
    </div>
  )
}

export default Profile