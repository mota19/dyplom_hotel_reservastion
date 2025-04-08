import { FC } from "react";
import Link from "next/link";

const Header: FC = () => {
  return (
    <header className="flex h-[100px] items-center justify-between px-8">
      <div className="flex items-center">
        <h1 className="text-5xl font-[700]">Stay way</h1>
        <nav className="ml-[100px] flex space-x-8 text-2xl">
          <Link href="#">Home</Link>
          <Link href="#">Booking</Link>
          <Link href="#">About</Link>
          <Link href="#">Ya Lox</Link>
        </nav>
      </div>

      <div className="flex gap-4 text-lg">
        <Link
          href="sign-up"
          className="w-[100px] rounded-[24px] border-[1px] border-blue-600 bg-white p-4 text-center text-[16px] text-blue-600"
        >
          Sign up
        </Link>
        <Link
          href="sign-in"
          className="w-[100px] rounded-[24px] bg-blue-600 p-4 text-center text-[16px] text-white"
        >
          Log in
        </Link>
      </div>
    </header>
  );
};

export default Header;
