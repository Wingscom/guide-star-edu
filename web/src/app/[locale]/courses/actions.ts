import { CountryCode } from "@/types/CountryCode";
import { Course } from "./_types/Course";
import { noData } from "@/constants/commons";
import { cache } from "react";

export async function getAvailableCountries() {
  const response = await fetch(
    `${process.env.BACKEND_HOST}/schools/countries`,
    {
      headers: {
        "X-Api-Key": process.env.BACKEND_API_KEY,
      },
    }
  );
  const result = (await response.json()) as { data: CountryCode[] };
  return result.data;
}

export const getAvailableStates = cache(async (country?: string) => {
  if (!country) return [];
  const response = await fetch(
    `${process.env.BACKEND_HOST}/schools/countries/${country}/states`,
    {
      headers: {
        "X-Api-Key": process.env.BACKEND_API_KEY,
      },
    }
  );
  const result = (await response.json()) as { data: string[] };
  return result.data;
});

export const getAvailableCities = cache(
  async (country?: string, state?: string) => {
    if (!country || !state) return [];
    const response = await fetch(
      `${process.env.BACKEND_HOST}/schools/countries/${country}/states/${state}/cities`,
      {
        headers: {
          "X-Api-Key": process.env.BACKEND_API_KEY,
        },
      }
    );
    const result = (await response.json()) as { data: string[] };
    return result.data;
  }
);

export type SearchCourseRequest = {
  search?: string;
  country?: string;
  state?: string;
  city?: string;
  sector?: string;
  page?: number;
};

export type SearchCourseResponse = {
  data: Course[];
  total: number;
  page: number;
  per_page: number;
  has_more: boolean;
};

export const searchCourses = cache(async (request: SearchCourseRequest) => {
  const processedRequest = {
    ...request,
    city: request.city === noData ? "" : request.city,
  };
  const response = await fetch(
    `${process.env.BACKEND_HOST}/schools/courses/search`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.BACKEND_API_KEY,
      },
      body: JSON.stringify(processedRequest),
      next: {
        revalidate: 3600,
        tags: ["courses"],
      },
    }
  );

  const responseData = await response.json();
  return responseData as SearchCourseResponse;
});
