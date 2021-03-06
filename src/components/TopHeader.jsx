import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { SearchIcon, ShoppingCartIcon, LocationMarkerIcon, TranslateIcon } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useSelector } from 'react-redux'
import { selectItems } from '../redux/slices/cartSlice'

const TopHeader = ({ handleSearchOverlay }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  const [totalItems, setTotalItems] = useState(0);

  const [showSignIn, setShowSignIn] = useState(false);
  
  const [showLanguages, setShowLanguages] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');
  const [languages, setLanguages] = useState([
    { id: 1, name: 'English' },
    { id: 2, name: 'Hindi' },
    { id: 3, name: 'Japanese' }
  ]);

  const handleShowLanguages = () => {
    setShowLanguages(prevState => !prevState);
  }

  const handleChangeLanguage = (name) => {
    setCurrentLang(name);
    console.log(name);
  }

  const handleShowSignIn = () => {
    setShowSignIn(prevState => !prevState);
  }

  useEffect(() => {
    let total = 0;

    items.length > 0 && items.forEach(item => {
      total += item.count;
    });

    setTotalItems(total);
  }, [items]);

  return (
    <div className='flex items-center bg-techiebay_blue flex-grow px-1 py-2'>
      {/* Left Part */}
      
      {/* Brand */}
      <div onClick={() => router.push('/')} className='ml-4 mt-2 flex items-center flex-grow sm:flex-grow-0'>
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
      <div className='hidden sm:flex sm:ml-3 items-center h-10 rounded-md flex-grow cursor-pointer'>
        <button className='p-2 py-2 rounded-l-md bg-gray-100 text-gray-600 hover:bg-gray-300'>
          <span className='flex items-end'>All <ChevronDownIcon className='pl-2 h-5' /></span>
        </button>
        <input
          className='p-2 h-full w-6 flex-grow flex-shrink focus:outline-orange-500 px-4'
          type='text'
          onFocus={handleSearchOverlay}
        />
        <SearchIcon className='h-10 p-3 bg-orange-400 hover:bg-orange-500 rounded-r-md' />
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
            className='bg-zinc-200 text-techiebay_blue absolute right-80 top-12 rounded-sm z-20'
          >
            <div className='relative left-24 -top-2 border-zinc-200 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent'></div>
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
                    <label className='pl-3 cursor-pointer' htmlFor={language.name}>
                      {language.name}
                    </label>
                  </li>
                ))}
              </ul>
            </form>
          </div>
        )}

        {/* Login Info */}
        <div
          onClick={!session ? signIn : signOut}
          onMouseEnter={handleShowSignIn}
          onMouseLeave={handleShowSignIn}
          className='link'
        >
          <p>{session ? `Hello, ${session.user.name}` : 'Sign In'}</p>
          <p className='text-white font-bold'>Account &amp; Lists</p>
        </div>

        {showSignIn && (
          <div
            onMouseEnter={handleShowSignIn}
            onMouseLeave={handleShowSignIn}
            className='hidden lg:block bg-zinc-200 text-techiebay_blue absolute right-44 top-14 rounded-sm z-20'
          >
            <div className='relative left-14 -top-2 border-zinc-200 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent'></div>
            <div className=''>
              <button onClick={!session ? signIn : signOut} className='btn m-5 px-8'>
                {!session ? 'Sign In' : 'Sign Out'}
              </button>
            </div>
          </div>
        )}

        {/* Previous Orders */}
        <div className='link' onClick={() => router.push('/orders')}>
          <p>Returns</p>
          <p className='text-white font-bold'>&amp; Orders</p>
        </div>

        {/* Shopping Cart */}
        <div className='text-white flex flex-row items-end link' onClick={() => router.push('/checkout')}>
          <ShoppingCartIcon className='h-8' />
          <div>
            <p className='text-xs font-extrabold text-orange-400 rounded-full w-4 text-center'>
              {totalItems}
            </p>
            <p className='hidden md:inline font-bold'>Cart</p>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default TopHeader;