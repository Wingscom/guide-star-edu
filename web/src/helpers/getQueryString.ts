import qs, { StringifyOptions } from "query-string";

const defaultOptions: StringifyOptions = {
  skipNull: true,
  skipEmptyString: true,
};

export const getQueryString = (
  queryObj?: Record<string, any>,
  options: StringifyOptions = defaultOptions
) => {
  if (!queryObj) return "";

  return `?${qs.stringify(queryObj, options)}`;
};
