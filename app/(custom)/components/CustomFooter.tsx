import { Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import xicon from "@/public/images/x2.svg";

const CustomFooter = () => {
  return (
    <div className="absolute bottom-0 w-full py-6 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
      <footer className="w-full bg-black px-2 py-3 rounded-full">
        <div className="mx-auto flex items-center justify-between px-3">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <Link href="/home">
              <div className="relative h-10 w-32">
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  width={130}
                  height={130}
                  className="w-36 2xl:w-48"
                />
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {/* <li>
                <Link
                  href="/login"
                  className="text-sm text-white hover:text-gray-300"
                >
                  Login
                </Link>
              </li> */}
              <li>
                <Link
                  href="/start-hosting"
                  className="text-sm text-white hover:text-gray-300"
                >
                  Signup
                </Link>
              </li>
              <li>
                <Link
                  href="/start-hosting"
                  className="text-sm text-white hover:text-gray-300"
                >
                  List Land
                </Link>
              </li>
              <li>
                <Link
                  href="/home"
                  className="text-sm text-white hover:text-gray-300"
                >
                  Start Hunting
                </Link>
              </li>
            </ul>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center space-x-4 z-50">
            <Link
              href="https://www.instagram.com/huntgrounds/"
              className="text-black rounded-full p-1.5 hover:text-gray-300 bg-white"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </Link>
            <Link
              href="https://www.facebook.com/profile.php?id=61564649940146&mibextid=LQQJ4d"
              className="text-black rounded-full p-1.5 hover:text-gray-300 bg-white"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </Link>
            <Link
              href="https://www.twitter.com/HuntgroundsInc"
              className="text-black rounded-full  hover:text-gray-300 bg-white"
              aria-label="YouTube"
            >
              <Image src={xicon} alt="YouTube" width={33} height={33} />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CustomFooter;
