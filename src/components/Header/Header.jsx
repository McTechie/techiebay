import TopHeader from '../TopHeader/TopHeader'
import BottomHeader from '../BottomHeader/BottomHeader'

const Header = ({ handleSearchOverlay }) => {
  const items = [];

  return (
    <header>
      <TopHeader numOfItems={items.length} handleSearchOverlay={handleSearchOverlay} />
      <BottomHeader />
    </header>
  );
}
 
export default Header;