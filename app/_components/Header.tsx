"use client";
import { FC, useState } from "react";
import Link from "next/link";
import CheckAuth from "./CheckAuth";
import { Menu, X } from "lucide-react";

const Header: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative my-4 flex h-[100px] items-center justify-between px-4 sm:px-8">
      <div className="flex items-center">
        <h1 className="hidden text-2xl font-bold sm:block sm:text-3xl md:text-4xl lg:text-5xl">
          Stay way
        </h1>
        <nav className="ml-6 hidden space-x-4 text-base sm:flex sm:space-x-6 sm:text-lg md:ml-[100px] md:text-xl lg:text-2xl">
          <Link href="/">Home</Link>
          <Link href="/booking">Booking</Link>
          <Link href="/about">About</Link>
          <Link href="/profile">Profile</Link>
        </nav>

        <button
          className="ml-2 block sm:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      <div>
        <CheckAuth />
      </div>
      {menuOpen && (
        <nav className="absolute top-[100px] left-0 z-10 flex w-full flex-col items-start space-y-4 bg-white px-8 py-6 text-lg shadow-md sm:hidden">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/booking" onClick={() => setMenuOpen(false)}>
            Booking
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link href="/profile" onClick={() => setMenuOpen(false)}>
            Profile
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
