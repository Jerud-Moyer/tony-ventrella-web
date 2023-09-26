import Toolbar from '@/components/Toolbar'
import React, { ReactNode } from 'react'
import TypeOut from './TypeOut';
import Footer from './Footer';

type Props = {
  typeoutMessage: string;
  children: ReactNode;
}

function SubPageLayout({ typeoutMessage, children }: Props) {
  return (
    <div className='relative bg-soft_white pb-44 px-0 overflow-x-hidden'>
      <Toolbar />
      <div className='absolute top-16 w-screen h-18 p-6 bg-eerie_black'>
        <TypeOut 
          forHome={false}
          text={typeoutMessage}
        />
      </div>
      <div className='mt-36 p-40 min-h-[64vh]'>
        { children }
      </div>
      <Footer />
    </div>
  )
}

export default SubPageLayout
