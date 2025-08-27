"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";

type LogoLinkProps = {
  className?: string;
};

const LogoLink: React.FC<LogoLinkProps> = ({ className }) => {
  const routesT = useTranslations("routes");
  const pathname = usePathname();

  return (
    <Link
      className={`
        relative
        ${className}
      `}
      href={routesT("home.href")}
      onClick={(e) => {
        if (pathname === routesT("home.href")) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
    >
      <Image
        className="object-contain"
        src="/assets/logo.svg"
        alt="We Protect Security"
        sizes="128px"
        priority={true}
      />
    </Link>
  );
};

export default LogoLink;
