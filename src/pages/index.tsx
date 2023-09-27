import Image from 'next/image'
import { Inter } from 'next/font/google'
import Hero from '@/components/Hero'
import Toolbar from '@/components/Toolbar'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import SlideShow from '@/components/SlideShow'
import careerImages from '../../data/career-images'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main 
      className="flex min-h-screen flex-col items-center justify-between p-24 relative bg-soft_white scroll-smooth overflow-x-hidden"
    >
      <Toolbar />
      <Hero />
      <div className='pt-72'>
        <div className='flex justify-around'>
          <div className='pt-12'>
            <Image
              alt='main image'
              src='/images/Head shot 2023.JPG'
              width='500'
              height='600'
            />
          </div>
          <div className='flex flex-col max-w-[36%]'>
            <div className='pt-12'>
              <p className='text-3xl text-eerie_black italic inline'>&quot;Tony is a talented speaker</p>
              <p className='text-eerie_black text-2xl inline'>&nbsp; with the amazing ability to make his listeners feel engaged and involved.  He exudes an atmosphere of trust and caring.</p>
              <p className='text-3xl text-eerie_black italic inline'>&quot;</p>
              <p className='text-bold text-eerie_black text-right mt-3'>Sharon Mast</p>
            </div>
            <div className='mt-12'>
              <p className='text-3xl text-eerie_black italic inline'>&quot;Tony was extremely popular with our group.</p>
              <p className='text-eerie_black text-2xl inline'>&nbsp; His upbeat and positive message and often funny stories kept everyone engaged and entertained. It was a great way to close out our 3 day conference and walk away with a new way to think about the impact we have on others and our own lives.</p>
              <p className='text-3xl text-eerie_black italic inline'>&quot;</p>
              <p className='text-bold text-eerie_black text-right mt-3'>From Washington Fire Chiefs Conference</p>
            </div>
            <div className='mt-12'>
              <p className='text-2xl text-eerie_black inline'>&quot;Your &nbsp;</p>
              <p className='text-3xl text-eerie_black italic inline'>Smile in the mirror</p>
              <p className='text-eerie_black text-2xl inline'>&nbsp; presentation was lively and entertaining, which is always nice for an afternoon when the audience may need to be invigorated just a bit. I enjoyed learning more about your family and career path. Your message is a reminder that with hard work and determination anything is possible.</p>
              <p className='text-3xl text-eerie_black italic inline'>&quot;</p>
              <p className='text-bold text-eerie_black text-right mt-3'>Bob Ferguson</p>
              <p className='text-bold text-eerie_black text-right'>Attorney General</p>
            </div>
          </div>
        </div>
        <div className='flex justify-around'>
          <div className='w-fit block mx-auto mt-40'>
            <SlideShow
              slideContent={careerImages}
            />
          </div>
        </div>
        <div className='mt-52' id='contact'>
          <ContactForm />
        </div>
      </div>
      <div className='h-64'></div>
      <Footer />
    </main>
  )
}
