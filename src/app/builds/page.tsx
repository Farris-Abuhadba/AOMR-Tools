"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import GODS, { IGod } from "@/data/Gods";
import { useSearchParams } from "next/navigation";

const BuildsPage = () => {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<string>(searchParams.get("g") ?? "");

  const groupedGods = useMemo(() => {
    const groupedGods: { [p: string]: IGod[] } = {};
    Object.values(GODS).forEach((god) => {
      if (!groupedGods[god.pantheon]) groupedGods[god.pantheon] = [];
      groupedGods[god.pantheon].push({
        name: god.name,
        pantheon: god.pantheon,
      });
    });

    return groupedGods;
  }, []);

  return (
    <div className="flex flex-wrap gap-4 m-4">
      {Object.keys(groupedGods).map((pantheon) => (
        <PantheonGroup key={pantheon} name={pantheon}>
          {groupedGods[pantheon].map((god) => (
            <GodButton
              key={god.name}
              name={god.name}
              selected={selected === god.name}
              onClick={() => setSelected(god.name)}
            />
          ))}
        </PantheonGroup>
      ))}
    </div>
  );
};

interface PantheonGroupProps {
  name: string;
  children?: React.ReactNode;
}

const PantheonGroup = ({ name, children }: PantheonGroupProps) => {
  return (
    <div className="bg-black/25 border-4 border-[#acacac] rounded-lg p-4 text-white constantia-bold">
      <span className="text-2xl gradient-text">{name.toUpperCase()}</span>
      <div className="flex gap-4">{children}</div>
    </div>
  );
};

interface GodButtonProps {
  name: string;
  selected: boolean;
  onClick: () => void;
}

const GodButton = ({ name, selected, onClick }: GodButtonProps) => {
  return (
    <div
      className="flex flex-col gap-2 items-center cursor-pointer"
      title={name}
      onClick={onClick}
    >
      <Image
        src={`/images/gods/${name.toLowerCase()}_profile.webp`}
        alt={name}
        width={96}
        height={96}
        className="rounded-full hover:shadow-lg transition-all hover:scale-105 outline outline-offset-0 hover:outline-white"
      />
      {selected && (
        <span className="bg-amber-950 w-full text-center border-2">{name}</span>
      )}
    </div>
  );
};

export default BuildsPage;
