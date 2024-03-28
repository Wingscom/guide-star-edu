import { CountryCode } from "@/types/CountryCode";

export type School = {
  id: number;
  name: string;
  country: CountryCode;
  state: string;
  city: string;
  sources: string[];
};
