import TopHeader from './TopHeader'
import BottomHeader from './BottomHeader'

const Header = ({ handleSearchOverlay }) => {
  return (
    <header className='sticky top-0 z-50'>
      <TopHeader handleSearchOverlay={handleSearchOverlay} />
      <BottomHeader />
    </header>
  );
}
 
export default Header;