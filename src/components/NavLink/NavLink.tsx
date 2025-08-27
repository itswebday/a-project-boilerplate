"use client";

import { useNavMenu } from "@/contexts";
import Link from "next/link";
import { useState } from "react";

export type NavLinkProps = {
  className?: string;
  children: React.ReactNode;
  href: string;
  target?: string;
  closesNavMenu?: boolean;
  routeLabel?: string;
  onClick?: () => void;
};

const NavLink: React.FC<NavLinkProps> = ({
  className,
  children,
  href,
  target = "_self",
  closesNavMenu = true,
  onClick,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const navMenu = useNavMenu();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (closesNavMenu) {
      navMenu.close();
    }

    if (href.startsWith("#")) {
      e.preventDefault();

      const targetElement = document.querySelector(href);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start",
        });
      }
    } else {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 1000);
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      className={`
        flex items-center py-2 px-nav-link text-white
        hover:text-primary-beige transition-colors duration-200
        ${isClicked ? "pointer-events-none" : ""}
        ${className}
      `}
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      onClick={handleClick}
    >
      {/* Text */}
      {children}
    </Link>
  );
};

export default NavLink;
