import { useState } from 'react'
import BrandFooter from '../BrandFooter/BrandFooter'

const Footer = () => {
  const [footerItems] = useState([
    { 
      'Get to Know Us': [
        'About Us',
        'Careers',
        'Press Releases',
        'Techiebay Cares',
        'Gift a Smile',
        'Techiebay Science'
      ]
    },
    {
      'Connect with Us': [
        'Facebook',
        'Twitter',
        'Instagram',
      ]
    },
    {
      'Make Money with Us': [
        'Sell on Techiebay',
        'Sell under Techiebay Accelerator',
        'Techiebay Global Selling',
        'Become an Affiliate',
        'Fulfilment by Techiebay',
        'Advertise Your Products',
        'Techiebay Pay on Merchants',
      ]
    },
    {
      'Let Us Help You': [
        'COVID-19 and Techiebay',
        'Your Account',
        'Returns Centre',
        '100% Purchase Protection',
        'Techiebay App Download',
        'Techiebay Assistant Download',
        'Help',
      ]
    }
  ]);

  return (
    <footer className='pt-2'>
      <button
        className='w-full p-4 bg-slate-700 text-white text-[0.9rem] hover:bg-gray-600 border-none'
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Back to top
      </button>
      
      <div className='flex items-start sm:justify-between lg:justify-evenly flex-grow bg-techiebay_blue-light px-2 lg:px-20 xl:px-28 pt-14 pb-16 text-white'>
        {footerItems.map((footerItem, idx) => {
          const currentFooterItem = Object.keys(footerItem)[0];
          return (
            <div key={idx} className='px-2 md:px-5'>
              <h5 className='font-bold pb-3 text-xs md:text-sm xl:text-lg'>{currentFooterItem}</h5>
              <ul className='flex flex-col space-y-2 text-[0.6rem] xl:text-sm font-bold text-gray-100'>
                {footerItem[currentFooterItem].map((footerLink, linkIdx) => (
                  <li key={linkIdx} className='font-light hover:underline cursor-pointer inline-flex'>
                    {footerLink}
                  </li>
                ))}
              </ul>
            </div>
          )})}
      </div>

      <div className='w-full h-[0.1rem] bg-gray-600' />

      <BrandFooter />
    </footer>
  );
}
 
export default Footer;