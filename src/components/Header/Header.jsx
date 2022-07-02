import TopHeader from '../TopHeader/TopHeader'
import BottomHeader from '../BottomHeader/BottomHeader'

const Header = () => {
  const items = [];

  return (
    <header>
      <TopHeader numOfItems={items.length} />
      <BottomHeader />
    </header>
  );
}
 
export default Header;