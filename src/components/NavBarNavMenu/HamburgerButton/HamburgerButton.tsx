"use client";

import HamburgerDash from "./HamburgerDash";
import { useNavMenu } from "@/contexts";

type HamburgerButtonProps = {
  className?: string;
};

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ className }) => {
  const navMenu = useNavMenu();

  return (
    <button
      className={`
        flex-col justify-between gap-1.5 w-16 h-16 px-4.5 py-5.5
        ${className}
      `}
      onClick={navMenu.toggle}
    >
      {/* Hamburger dashes */}
      <HamburgerDash dashIndex={0} />
      <HamburgerDash dashIndex={1} />
      <HamburgerDash dashIndex={2} />
    </button>
  );
};

export default HamburgerButton;
