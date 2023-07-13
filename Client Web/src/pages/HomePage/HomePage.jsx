import Banner from './Banner/Banner';
import Categories from './Categories/Categories';
import Information from './Information/Information';
import Trending from './Trending/Trending';

function HomePage() {
  return (
    <>
      <Banner />
      <Categories />
      <Trending />
      <Information />
    </>
  );
}

export default HomePage;
