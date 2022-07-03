import { MenuIcon } from '@heroicons/react/outline'

const BottomHeader = () => {
  return (
    <div className='flex items-center space-x-3 py-1 pl-5 bg-techiebay_blue-light text-white text-md'>
      <p className='linkAlt flex items-center'>
        <MenuIcon className='h-6 mr-1' />
        All
      </p>
      <p className='linkAlt'>Essentials</p>
      <p className='linkAlt'>Bestsellers</p>
      <p className='linkAlt hidden md:inline-flex'>Today&#39;s Deals</p>
      <p className='linkAlt hidden lg:inline-flex'>Fashion</p>
      <p className='linkAlt hidden lg:inline-flex'>Electronics</p>
      <p className='linkAlt hidden lg:inline-flex'>Prime</p>
      <p className='linkAlt hidden lg:inline-flex'>Home &amp; Kitchen</p>
      <p className='linkAlt hidden lg:inline-flex'>Health &amp; Personal Care</p>
    </div>
  );
}
 
export default BottomHeader;