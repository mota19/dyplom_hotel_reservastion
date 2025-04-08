import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="h-auto w-auto bg-gray-300">
      <div className="m-auto flex max-w-[1200px] justify-between gap-16 px-32 py-8">
        <div className="flex-1">
          <ul className="space-y-2">
            <li className="text-lg font-[600]">Support</li>
            <li>Help Center</li>
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Live Chat</li>
          </ul>
        </div>
        <div className="flex-1">
          <ul className="space-y-2">
            <li className="text-lg font-[600]">Company</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="flex-1">
          <ul className="space-y-2">
            <li className="text-lg font-[600]">Legal</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Cookies</li>
            <li>Licensing</li>
          </ul>
        </div>
        <div className="flex-1">
          <ul className="space-y-2">
            <li className="text-lg font-[600]">Follow Us</li>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
          </ul>
        </div>
      </div>

      <div className="m-auto max-w-[1440px] border-t border-gray-400">
        <p className="py-4 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Stay Way. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
