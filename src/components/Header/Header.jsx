import TopHeader from './TopHeader'
import BottomHeader from './BottomHeader'

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