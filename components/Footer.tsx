import { Facebook, Instagram, PlayCircle, Twitter } from 'lucide-react';
import Play from 'lucide-react';
import React from 'react';
export default function Footer() {
  return (
    <footer className="bg-[#66E38A] p-5 flex flex-col gap-3 fixed bottom-0 left-0 right-0">
      <div className="flex justify-between">
        <div className='flex gap-3'>
                  <h4 className="text-left text-white">Get The App</h4>

                  <div className="flex gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className="text-white lucide lucide-apple"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" /><path d="M10 2c1 .5 2 2 2 5" /></svg>
                      <PlayCircle color='white'/>
                  </div>
        </div>

        <div className="flex gap-3">
          <Facebook  className='text-white' />
          <Twitter className='text-white' />
          <Instagram className='text-white' />
        </div>
      </div>

      <hr className='w-full bg-[#66E38A]' />
      <div className="flex justify-between">
              <h5 className='text-white'>Budget Budget</h5>

        <div className="flex gap-3">
          <p className='text-white'>Terms of service</p>
          <p className='text-white'>Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
}
