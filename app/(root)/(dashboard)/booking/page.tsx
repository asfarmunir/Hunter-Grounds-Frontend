import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <div className="w-full flex items-center mt-12  justify-center">
      <Image src="/images/hero.svg" alt="background" width={920} height={600} />
    </div>
  );
};

export default page;
