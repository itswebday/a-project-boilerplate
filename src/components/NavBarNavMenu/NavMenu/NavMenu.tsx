"use client";

import { NavLink } from "@/components";
import { useNavMenu } from "@/contexts";
import { useTranslations } from "next-intl";

type NavMenuProps = {
  className?: string;
  navLinks: { label: string }[];
  legalLinks: { label: string }[];
};

const NavMenu: React.FC<NavMenuProps> = ({
  className,
  navLinks,
  legalLinks,
}) => {
  const routesT = useTranslations("routes");
  const navMenu = useNavMenu();

  return (
    <div
      className={`
        z-30 fixed inset-0 min-w-[375px] flex justify-center items-center
        transition-transform duration-500 bg-primary-blue
        ${navMenu.isOpen ? "" : "translate-x-full"}
        ${className}
      `}
    >
      {/* Container */}
      <div
        className={`
          z-30 flex flex-col items-center gap-6 w-full pt-12
          overflow-y-scroll [&::-webkit-scrollbar]:hidden
          [-ms-overflow-style:none] [scrollbar-width:none]
        `}
      >
        {/* Navigation links */}
        <div
          className={`
            flex flex-col items-center gap-4 w-full font-semibold
          `}
        >
          {navLinks.map((link, index) => (
            <NavLink
              className="flex justify-center w-full"
              key={index}
              href={routesT(`${link.label}.href`)}
            >
              {routesT(`${link.label}.text`)}
            </NavLink>
          ))}
        </div>

        {/* Legal links */}
        <div
          className={`
            flex flex-col items-center w-full opacity-75
          `}
        >
          {legalLinks.map((link, index) => (
            <NavLink
              className="text-small flex justify-center w-full"
              key={index}
              href={routesT(`${link.label}.href`)}
            >
              {routesT(`${link.label}.text`)}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
