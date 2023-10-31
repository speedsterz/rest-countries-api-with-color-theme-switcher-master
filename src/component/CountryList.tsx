import { useQuery } from "react-query";
import axios from "axios";
import { useSearchCountry, useSelectedRegion } from "../store/useStore";
import { Link } from "react-router-dom";

interface CountryType {
  cca3: string;
  name: {
    common: string;
  };
  region: string;
  population: number;
  capital: string;
  flags: {
    png: string;
  };
}

const fetchCountries = () => {
  return axios
    .get<CountryType[]>("https://restcountries.com/v3.1/all")
    .then((response) => response.data);
};

const CountryList = () => {
  const { data, isLoading, isError } = useQuery<CountryType[]>(
    "countries",
    fetchCountries,
  );
  const { SearchCountry } = useSearchCountry();
  const { SelectedRegion } = useSelectedRegion();

  const filteredCountries = data?.filter((country) => {
    const nameMatch = country.name.common
      .toLowerCase()
      .includes(SearchCountry.toLowerCase());
    const regionMatch =
      SelectedRegion === "All" || country.region === SelectedRegion;
    return nameMatch && regionMatch;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="content">
      <ul className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredCountries?.map((country) => (
          <Link to={`/country/${country.name.common}`} key={country.cca3}>
            <div className="flex cursor-pointer flex-col gap-4 overflow-hidden rounded-md bg-LightMode-bg pb-12 text-LightMode-text shadow-md dark:bg-DarkMode-element  dark:text-white">
              <img
                className="h-[240px] sm:h-[180px]"
                src={country.flags.png}
                alt=""
              />
              <div className="mx-auto flex w-11/12 flex-col gap-3">
                <li
                  className="pb-2 text-lg font-bold"
                  key={country.name.common}
                >
                  {country.name.common}
                </li>
                <li key={country.population}>
                  <span className="font-bold">Population:</span>{" "}
                  {country.population.toLocaleString()}
                </li>
                <li key={country.region}>
                  <span className="font-bold">Region:</span> {country.region}
                </li>
                <li key={country.capital + "1"}>
                  <span className="font-bold">Capital:</span> {country.capital}
                </li>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
