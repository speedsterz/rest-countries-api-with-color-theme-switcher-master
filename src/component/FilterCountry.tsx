import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import { ChangeEvent, useState } from "react";
import { useSelectedRegion, useSearchCountry } from "../store/useStore";

const FilterCountry = () => {
  const [Filter, setFilter] = useState(false);
  const { SelectedRegion, setSelectedRegion } = useSelectedRegion();
  const { SearchCountry, setSearchCountry } = useSearchCountry();
  const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchCountry(e.target.value);
  };

  const toggleFilter = () => {
    setFilter(!Filter);
  };
  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    setFilter(false);
  };
  return (
    <div className="content">
      <div className="flex flex-col justify-between gap-8 md:flex-row">
        <div className="inline-flex  gap-2 rounded-md bg-white px-4 py-3 shadow-md dark:bg-DarkMode-element dark:text-white md:w-[350px]">
          <MagnifyingGlassIcon className="w-4 opacity-40" />
          <input
            className="bg-inherit  outline-none"
            type="text"
            placeholder="Search for a country"
            name=""
            id=""
            value={SearchCountry}
            onChange={handleChange}
          />
        </div>
        <div className="relative">
          <div
            className="inline-flex w-48 cursor-pointer select-none justify-between gap-6 self-start rounded-md bg-white px-4 py-3 shadow-md dark:bg-DarkMode-element dark:text-white"
            onClick={toggleFilter}
          >
            <h2>
              {SelectedRegion == "All" ? "Filter by Region" : SelectedRegion}
            </h2>
            <ChevronDownIcon
              className={`w-5 transform transition-transform duration-200 ${
                Filter ? "rotate-180" : ""
              }`}
            />
          </div>
          {Filter && (
            <div className="absolute left-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-DarkMode-element dark:text-white">
              <div className="py-1 ">
                {regions.map((region, index) => (
                  <button
                    key={index}
                    className="block w-full px-4 py-2 text-left text-sm 
                     hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => handleRegionSelect(region)}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterCountry;
