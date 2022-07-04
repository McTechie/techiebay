import { useState } from 'react'
import Image from 'next/image'
import { HeartIcon, GoogleIcon, CoffeeIcon } from './Icons'

const BrandFooter = () => {
  const [highlightFooter, setHighlightFooter] = useState(false);

  return (
    <div
      className='text-gray-400 opacity-95 bg-techiebay_blue-light text-center px-4 pt-12 pb-24 text-xs md:text-sm lg:text-base flex flex-col items-center space-y-6 lg:flex-row justify-around'
      onMouseEnter={() => setHighlightFooter(true)}
      onMouseLeave={() => setHighlightFooter(false)}
    >
      <div>
        &copy; <span className={`font-bold ${highlightFooter && 'text-white'}`}>Techiebay</span> 2022
      </div>

      <div className='flex flex-row'>
        const madeWith = &#40;
        
        <HeartIcon highlightFooter={highlightFooter} />,
        
        <GoogleIcon highlightFooter={highlightFooter} />,
        
        <CoffeeIcon highlightFooter={highlightFooter} />
        
        &#41; =&gt; &#123;
        A <span className={`px-2 font-bold ${highlightFooter && 'text-white'}`}> McTechie </span> Creation &#125;
      </div>

      <div className='flex items-center'>
        <span className='pr-2'>Powered by</span>&nbsp;
        <Image className={`opacity-${highlightFooter ? '100' : '60'}`} src='/fakestore.png' alt='Fake Store API' width={40} height={35} />
      </div>
    </div>
  );
}
 
export default BrandFooter;