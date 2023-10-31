import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useSearchCountry } from "../store/useStore";

interface CountryFullType {
  cca3: string;
  name: {
    common: string;
    nativeName: {
      [key: string]: {
        common: string;
      };
    };
  };
  tld: string;
  currencies: {
    [key: string]: {
      name: string;
    };
  };
  region: string;
  subregion: string;
  population: number;
  capital: string;
  flags: {
    png: string;
  };
  languages: string;
  borders: string[];
}
const fetchCountries = () => {
  return axios
    .get<CountryFullType[]>("https://restcountries.com/v3.1/all")
    .then((response) => response.data);
};

const CountryDetails: React.FC = () => {
  const { countryName = "" } = useParams<{ countryName?: string }>();
  const { data, isLoading, isError } = useQuery<CountryFullType[]>(
    "countries",
    fetchCountries,
  );
  const { setSearchCountry } = useSearchCountry();

  const Select_Country = data?.filter((country) => {
    return country.name.common
      .toLowerCase()
      .includes(countryName.toLowerCase());
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }
  if (Select_Country) {
    const border_countries = () => {
      const Arr = [];
      let temp;
      if (!Select_Country[0].borders) return [];
      for (const country of Select_Country[0].borders) {
        temp = data?.find((i) => i.cca3 == country);
        Arr.push(temp?.name.common);
      }
      return Arr;
    };
    return (
      <div className="content flex flex-col gap-12 text-LightMode-text dark:text-white md:mt-12">
        <Link
          onClick={() => setSearchCountry("")}
          to="/"
          className="inline-flex gap-1 self-start rounded bg-LightMode-element px-6 py-2   shadow-lg dark:bg-DarkMode-element "
        >
          <ArrowLeftIcon className="w-4" /> Back
        </Link>
        <div className="flex flex-col gap-8 md:flex-row lg:gap-16">
          <img src={Select_Country[0].flags.png} alt="" />
          <div className="flex flex-col gap-6  ">
            <h1 className="text-3xl font-bold">
              {Select_Country[0].name.common}
            </h1>
            <div className="flex flex-col gap-6 md:flex-row lg:gap-10 ">
              <div>
                <ul className="flex flex-col gap-2">
                  <li>
                    <span className="mr-2 font-bold">Native Name:</span>
                    {
                      Object.values(Select_Country[0].name.nativeName!)[0]
                        .common
                    }
                  </li>
                  <li>
                    <span className="mr-2 font-bold">Population:</span>
                    {Select_Country[0].population.toLocaleString()}
                  </li>
                  <li>
                    <span className="mr-2 font-bold">Region:</span>
                    {Select_Country[0].region}
                  </li>
                  <li>
                    <span className="mr-2 font-bold">Sub Region:</span>
                    {Select_Country[0].subregion}
                  </li>
                  <li>
                    <span className="mr-2 font-bold">Capital:</span>
                    {Select_Country[0].capital}
                  </li>
                </ul>
              </div>
              <div>
                <ul className="flex flex-col gap-2">
                  <li>
                    <span className="mr-2 font-bold">Top Level Domain:</span>
                    {Select_Country[0].tld}
                  </li>
                  <li>
                    <span className="mr-2 font-bold">Currencies:</span>
                    {Object.values(Select_Country[0].currencies!)[0].name}
                  </li>
                  <li>
                    <span className="mr-2 font-bold">Languages:</span>
                    {Object.values(Select_Country[0].languages).join(",")}
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col justify-start gap-1 md:flex-row md:items-center lg:gap-4 ">
              <h2 className="font-2xl font-bold">Border Countries:</h2>

              <div className="flex flex-wrap gap-3 ">
                {border_countries().map((country) => (
                  <Link
                    className=" rounded bg-LightMode-element px-4 py-1 shadow-md dark:bg-DarkMode-element"
                    to={`/country/${country}`}
                  >
                    {country}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CountryDetails;
