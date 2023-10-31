import CountryList from "../component/CountryList";
import FilterCountry from "../component/FilterCountry";
import Navbar from "../component/Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <FilterCountry />
      <CountryList />
    </>
  );
};

export default HomePage;
