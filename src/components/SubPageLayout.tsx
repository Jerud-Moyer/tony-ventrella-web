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
    <div className='relative bg-soft_white border-2 pb-44'>
      <Toolbar />
      <div className='absolute top-16 w-full h-18 p-6 bg-eerie_black'>
        <TypeOut 
          forHome={false}
          text={typeoutMessage}
        />
      </div>
      <div className='mt-52 p-40 min-h-[64vh]'>
        { children }
      </div>
      <Footer />
    </div>
  )
}

export default SubPageLayout
