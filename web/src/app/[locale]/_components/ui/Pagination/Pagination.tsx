"use client";

import { paginationConfig } from "@/constants/paginationConfig";
import { Pagination as MantinePagination } from "@mantine/core";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";

export function Pagination({ totalItems }: { totalItems: number }) {
  const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1));
  const total = Math.trunc(totalItems / paginationConfig.perPage) + 1;
  const shouldShow = total > 1;

  if (!shouldShow) return null;

  return (
    <MantinePagination
      total={total}
      value={page}
      onChange={(newValue) => setPage(newValue)}
    />
  );
}
