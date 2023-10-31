import { create } from "zustand";

interface SelectRegionType {
  SelectedRegion: string;
  setSelectedRegion: (i: string) => void;
}
export const useSelectedRegion = create<SelectRegionType>((set) => ({
  SelectedRegion: "All",
  setSelectedRegion: (x: string) => set(() => ({ SelectedRegion: x })),
}));

interface SearchType {
  SearchCountry: string;
  setSearchCountry: (i: string) => void;
}

export const useSearchCountry = create<SearchType>((set) => ({
  SearchCountry: "",
  setSearchCountry: (x: string) => set(() => ({ SearchCountry: x })),
}));
