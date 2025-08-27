"use client";

import { LogoLink, NavLink } from "@/components";
import { useTranslations } from "next-intl";

type NavBarProps = {
  className: string;
  links: { label: string }[];
  centeredLogo: boolean;
};

const NavBar: React.FC<NavBarProps> = ({
  className,
  links,
  centeredLogo = false,
}) => {
  const routesT = useTranslations("routes");

  // Determine link split
  const midIndex = Math.ceil(links.length / 2);
  const leftLinks = centeredLogo ? links.slice(0, midIndex) : [];
  const rightLinks = centeredLogo ? links.slice(midIndex) : links;

  return (
    <div
      className={`
        items-center gap-12
        ${className}
      `}
    >
      {/* Left links */}
      {centeredLogo && (
        <div className="flex items-center gap-6 lg:gap-10">
          {leftLinks.map((link, index) => (
            <NavLink
              className="hover:text-primary-beige"
              key={index}
              href={routesT(`${link.label}.href`)}
              target="_self"
            >
              {routesT(`${link.label}.text`)}
            </NavLink>
          ))}
        </div>
      )}

      {/* Logo */}
      {centeredLogo && <LogoLink className="w-20 h-20" />}

      {/* Right links */}
      <div className="flex items-center gap-6 lg:gap-10">
        {rightLinks.map((link, index) => (
          <NavLink
            key={index}
            href={routesT(`${link.label}.href`)}
            target="_self"
          >
            {routesT(`${link.label}.text`)}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
