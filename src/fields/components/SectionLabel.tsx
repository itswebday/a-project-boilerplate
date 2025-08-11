"use client";

import { useRowLabel } from "@payloadcms/ui";

const SectionLabel = () => {
  const { rowNumber } = useRowLabel();

  return <div>Sectie {rowNumber !== undefined ? rowNumber + 1 : ""}</div>;
};

export default SectionLabel;
