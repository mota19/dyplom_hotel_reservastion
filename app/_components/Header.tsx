import { FC } from "react";
import Link from "next/link";
import CheckAuth from "./CheckAuth";

const Header: FC = () => {
  return (
    <header className="my-4 flex h-[100px] items-center justify-between px-8">
      <div className="flex items-center">
        <h1 className="text-5xl font-[700]">Stay way</h1>
        <nav className="ml-[100px] flex space-x-8 text-2xl">
          <Link href="/">Home</Link>
          <Link href="/booking">Booking</Link>
          <Link href="#">About</Link>
          <Link href="/profile">Profile</Link>
        </nav>
      </div>
      <CheckAuth></CheckAuth>
    </header>
  );
};

export default Header;
