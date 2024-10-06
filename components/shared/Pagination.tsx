"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import { formUrlQuery } from "@/lib/utils";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClick = (btnType: string) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div
      className={`
        ${totalPages > 1 ? "flex" : "hidden"}
     gap-4 mt-10`}
    >
      <Button
        size="lg"
        variant="outline"
        onClick={() => onClick("prev")}
        disabled={Number(page) <= 1}
      >
        <FaChevronLeft className="text-xl text-primary-50" />
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={() => onClick("next")}
        disabled={Number(page) >= totalPages}
      >
        <FaChevronRight className="text-xl text-primary-50" />
      </Button>
    </div>
  );
};

export default Pagination;
