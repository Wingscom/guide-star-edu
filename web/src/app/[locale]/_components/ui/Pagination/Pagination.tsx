"use client";

import { paginationConfig } from "@/constants/paginationConfig";
import { getQueryString } from "@/helpers/getQueryString";
import { Pagination as MantinePagination } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { parse } from "querystring";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";

export function Pagination({ totalItems }: { totalItems: number }) {
  const [page, _setPage] = useQueryParam("page", withDefault(NumberParam, 1));
  const router = useRouter();
  const total = Math.trunc(totalItems / paginationConfig.perPage) + 1;
  const shouldShow = total > 1;
  const searchParams = useSearchParams();
  const queryObj = parse(searchParams.toString());

  if (!shouldShow) return null;

  const handleChangePage = (newPage: number) => {
    router.push(
      `${location.pathname}${getQueryString({ ...queryObj, page: newPage })}`
    );
  };

  return (
    <MantinePagination total={total} value={page} onChange={handleChangePage} />
  );
}
