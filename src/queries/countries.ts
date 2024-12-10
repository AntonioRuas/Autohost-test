import { AxiosResponse } from "axios";
import { getApiClient } from "src/modules/axios";
import { ICountry } from "src/interfaces/home";

// Query to get all countries from restcountries api
export const getAllCountries = async () => {
  try {
    const data: AxiosResponse<ICountry[]> = await getApiClient().get("/all");
    const result = data.data
      .map((country) => country.name.official)
      .sort((a, b) => (a < b ? -1 : 1));
    return result;
  } catch (err) {
    throw err;
  }
};
