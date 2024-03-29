import { Chad } from "./data";

export const searchFilter = (data: Chad[], searchQuery: string) => {
  const lowercasedValue = searchQuery.toLowerCase().trim();
  if (lowercasedValue === "") return data;
  const filteredData = data.filter((item) => {
    return Object.values(item).some((value) => {
      return value.toString().toLowerCase().includes(lowercasedValue);
    });
  });

  return filteredData;
};
