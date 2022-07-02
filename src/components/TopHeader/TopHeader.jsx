import { useState } from 'react'
import Image from 'next/image'
import { SearchIcon, ShoppingCartIcon, LocationMarkerIcon, TranslateIcon, ChevronDownIcon } from '@heroicons/react/outline'

const TopHeader = ({ numOfItems }) => {
  const [showLanguages, setShowLanguages] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');
  const [languages, setLanguages] = useState([
    { id: 1, name: 'English' },
    { id: 2, name: 'Hindi' },
    { id: 3, name: 'Japanese' }
  ])

  const handleShowLanguages = () => {
    setShowLanguages(prevState => !prevState);
  }

  const handleChangeLanguage = (name) => {
    setCurrentLang(name);
    console.log(name);
  }

  return (
    <div className='flex items-center bg-techiebay_blue flex-grow px-1 py-2'>
      
      {/* Left Part */}
      
      {/* Brand */}
      <div className='ml-4 mt-2 flex items-center flex-grow sm:flex-grow-0'>
        <Image
          src='/logo.png'
          alt='Techiebay Logo'
          width={100}
          height={45}
          objectFit='contain'
          className='cursor-pointer'
        />
      </div>

      {/* Location Picker */}
      <div className='hidden lg:flex content-end text-white mx-4 link'>
        <LocationMarkerIcon className='h-5 mt-3 p-1 pb-0' />
        <div className='flex flex-col text-xs'>
          <p className='text-gray-400'>Hello</p>
          <p className='md:text-sm font-bold'>Select your address</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className='hidden sm:flex sm:ml-3 items-center h-10 rounded-md flex-grow cursor-pointer bg-orange-400  hover:bg-orange-500'>
        <input className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4' type='text' />
        <SearchIcon className='h-12 p-3' />
      </div>

      {/* Right Part */}

      <div className='flex text-gray-400 items-center text-xs space-x-5 lg:mx-3 whitespace-nowrap md:text-sm relative'>
        {/* Language Selection */}
        <div onMouseEnter={handleShowLanguages} onMouseLeave={handleShowLanguages} className='hidden lg:flex link items-end' aria-expanded='false' aria-haspopup='true'>
          <TranslateIcon className='text-white h-6' />
          <ChevronDownIcon className='pl-2 h-4' />
        </div>

        {showLanguages && (
          <div
            onMouseEnter={handleShowLanguages}
            onMouseLeave={handleShowLanguages}
            className='bg-zinc-200 text-techiebay_blue absolute right-80 top-12 rounded-sm'
          >
            <div className='relative left-[4.25rem] -top-2 border-zinc-200 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent'></div>
            <form className='text-sm w-36'>
              <ul className='px-4 pb-3 pt-2 space-y-3'>
                {languages.map(language => (
                  <li
                    key={language.id}
                    className='hover:font-bold flex items-center'
                  >
                    <input
                      type='radio'
                      checked={currentLang === language.name}
                      name='language'
                      value={language.name}
                      id={language.name}
                      className='cursor-pointer'
                      onChange={() => handleChangeLanguage(language.name)}
                    />
                    <label className='pl-3 cursor-pointer' htmlFor={language.name}>{language.name}</label>
                  </li>
                ))}
              </ul>
            </form>
          </div>
        )}

        {/* Login Info */}
        <div className='link'>
          <p>Hello, Mcvean Soans</p>
          <p className='text-white font-bold'>Account &amp; Lists</p>
        </div>

        {/* Previous Orders */}
        <div className='link'>
          <p>Returns</p>
          <p className='text-white font-bold'>&amp; Orders</p>
        </div>

        {/* Shopping Cart */}
        <div className='text-white flex flex-row items-end link'>
          <ShoppingCartIcon className='h-8' />
          <div>
            <p className='text-xs font-extrabold text-orange-400 rounded-full w-4 text-center'>
              {numOfItems}
            </p>
            <p className='font-bold'>Cart</p>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default TopHeader;