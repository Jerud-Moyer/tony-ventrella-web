import Image from 'next/image'
import { Inter } from 'next/font/google'
import Hero from '@/components/Hero'
import Toolbar from '@/components/Toolbar'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main 
      className="flex min-h-screen flex-col items-center justify-between p-24 relative bg-soft_white"
    >
      <Toolbar />
      <Hero />
      <div className='pt-72'>
        <div className='flex justify-around'>
          <Image
            alt='main image'
            src='/images/Head shot 2023.JPG'
            width='400'
            height='600'
          />
          <div className='max-w-[40%] pt-20'>
            <p className='text-3xl text-eerie_black italic'>Some info here</p>
            <p className='text-eerie_black'>some words about Tony, maybe something about his speaking engagements or a nice message, could be anything really, but this is just filler for the time being</p>
            <p className='text-2xl text-bold text-eerie_black'>{'<-- picture there could be any of the pictures or could be a slideshow of pictures of your choosing!'}</p>
          </div>
        </div>
        <div className='flex justify-around mt-40'>
          <div className='max-w-[40%] pt-20 '>
            <p className='text-3xl text-eerie_black italic'>Maybe another section here</p>
            <p className='text-eerie_black'>Talk about something else here, related to speaking or all the cool stuff you have done throught you career.</p>
          </div>
          <Image
            alt='main image'
            src='/images/Lesley Stahl 60 Minutes.JPG'
            width='400'
            height='600'
          />
        </div>
        <ContactForm />
      </div>
      <div className='h-64'></div>
      <Footer />
    </main>
  )
}
