import Image from "next/image";
import React from "react";

function Logo() {
  return (
    <Image
      src="/logo.svg"
      width={100}
      height={24}
      alt="Protocol"
      className="h-6 w-auto"
      priority
    />
  );
}

export default Logo;
