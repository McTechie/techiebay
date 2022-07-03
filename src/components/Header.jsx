import TopHeader from './TopHeader'
import BottomHeader from './BottomHeader'

const Header = ({ handleSearchOverlay }) => {
  return (
    <header>
      <TopHeader handleSearchOverlay={handleSearchOverlay} />
      <BottomHeader />
    </header>
  );
}
 
export default Header;