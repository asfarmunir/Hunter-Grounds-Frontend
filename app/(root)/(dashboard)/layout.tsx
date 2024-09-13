import React from "react";
import Topbar from "@/components/shared/Topbar";

const links = [
  {
    name: "dashboard",
    href: "/dashboard",
  },
  {
    name: "Bookings",
    href: "/booking",
  },
  {
    name: "Property",
    href: "/property",
  },
  {
    name: "Calendar",
    href: "/calendar",
  },
  {
    name: "Inbox",
    href: "/inbox",
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
