import React from "react";
import Topbar from "@/components/shared/Topbar";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Hunt Cash",
    href: "/refer-and-earn",
  },
  {
    name: "Overview",
    href: "/hunt-cash",
  },
];
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full ">
      <Topbar links={links} />
      {children}
    </div>
  );
};

export default layout;
