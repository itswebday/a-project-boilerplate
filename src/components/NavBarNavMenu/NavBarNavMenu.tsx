"use client";

import HamburgerButton from "./HamburgerButton";
import NavBar from "./NavBar";
import NavMenu from "./NavMenu";
import { LogoLink } from "@/components";

type NavBarNavMenuProps = {
  centeredLogo?: boolean;
};

const NavBarNavMenu: React.FC<NavBarNavMenuProps> = ({
  centeredLogo = true,
}) => {
  return (
    <nav
      className={`
        flex justify-center items-center w-full px-4 py-2 bg-red-500
      `}
    >
      {/* Container */}
      <div
        className={`
          container-medium flex items-center gap-2 w-full
          ${centeredLogo ? "justify-center" : "justify-between"}
        `}
      >
        {/* Logo */}
        <LogoLink
          className={`
            z-40 w-20 h-20 bg-blue-400
            ${centeredLogo ? "de:hidden" : ""}
          `}
        />

        {/* Hamburger button (mobile) */}
        <HamburgerButton className="z-40 flex de:hidden" />

        {/* Navigation menu (mobile) */}
        <NavMenu className="de:hidden" navLinks={[]} legalLinks={[]} />

        {/* Navigation bar (desktop) */}
        <NavBar
          className="hidden de:flex"
          centeredLogo={centeredLogo}
          links={[]}
        />
      </div>
    </nav>
  );
};

export default NavBarNavMenu;
