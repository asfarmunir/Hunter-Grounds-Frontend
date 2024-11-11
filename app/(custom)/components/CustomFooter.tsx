import { Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CustomFooter = () => {
  return (
    <div className="absolute bottom-0 w-full py-6 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
      <footer className="w-full bg-black px-2 py-3 rounded-full">
        <div className="mx-auto flex items-center justify-between px-3">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <Link href="/">
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
              <li>
                <Link
                  href="/login"
                  className="text-sm text-white hover:text-gray-300"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="text-sm text-white hover:text-gray-300"
                >
                  Signup
                </Link>
              </li>
              <li>
                <Link
                  href="/list-land"
                  className="text-sm text-white hover:text-gray-300"
                >
                  List Land
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="text-sm text-white hover:text-gray-300"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/start-hunting"
                  className="text-sm text-white hover:text-gray-300"
                >
                  Start Hunting
                </Link>
              </li>
            </ul>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <Link
              href="https://instagram.com"
              className="text-white hover:text-gray-300"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </Link>
            <Link
              href="https://facebook.com"
              className="text-white hover:text-gray-300"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </Link>
            <Link
              href="https://youtube.com"
              className="text-white hover:text-gray-300"
              aria-label="YouTube"
            >
              <Youtube size={20} />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CustomFooter;
