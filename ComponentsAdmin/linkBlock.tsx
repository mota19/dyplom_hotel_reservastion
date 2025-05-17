import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { StaticImageData } from "next/image";

interface ILinkBlock {
  href: string;
  imageSource: StaticImageData;
  alt: string;
  text: string;
}

const LinkBLock: FC<ILinkBlock> = ({ href, imageSource, alt, text }) => {
  return (
    <Link
      href={`/admin/${href}`}
      className="flex h-[60px] w-[250px] items-center gap-2 px-3 hover:bg-gray-100 active:bg-gray-100"
    >
      <Image
        src={imageSource}
        width={32}
        height={32}
        alt={alt}
        className="h-[32px] w-[32px]"
      />
      {text}
    </Link>
  );
};

export default LinkBLock;
