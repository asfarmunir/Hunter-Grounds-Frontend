import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

const GoogleLogin = () => {
  const googleLogin = async () => {
    const res = await signIn("google", { callbackUrl: "/" });
    console.log(res);
  };

  return (
    <button type="button" onClick={googleLogin}>
      <Image src="/images/google.svg" alt="google" width={35} height={35} />
    </button>
  );
};

export default GoogleLogin;
