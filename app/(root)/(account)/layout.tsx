import React from "react";
import Topbar from "@/components/shared/Topbar";

const links = [
  {
    name: "account",
    href: "/account",
  },
  {
    name: "inbox",
    href: "/account/inbox",
  },
];
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full bg-primary">
      <Topbar links={links} />
      {children}
    </div>
  );
};

export default layout;
