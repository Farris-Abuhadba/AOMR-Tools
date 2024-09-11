import Image from "next/image";
import GODS, { IGod } from "@/data/Gods";
import Link from "next/link";

export default function Home() {
  return (
    <div className="m-8">
      <h1 className="text-6xl uppercase constantia-bold text-gray-200">
        Browse build by God
      </h1>
      <div className="flex flex-wrap">
        {Object.values(GODS).map((god) => (
          <GodPortrait key={god.name} god={god} />
        ))}
      </div>
    </div>
  );
}

interface GodPortraitProps {
  god: IGod;
}

const GodPortrait = ({ god }: GodPortraitProps) => {
  return (
    <Link href={`builds?g=${god.name}`}>
      <div className="flex flex-col items-center group cursor-pointer">
        <Image
          className="group-hover:scale-110 transition-transform"
          src={`/images/gods/${god.name.toLowerCase()}/portrait.webp`}
          alt={god.name}
          width={256}
          height={643}
        />
        <span
          className={
            "text-2xl uppercase -translate-y-6 group-hover:-translate-y-2 transition-transform m-0 " +
            "text-gray-400 bg-gradient-to-b from-amber-50 to-amber-400 group-hover:text-transparent bg-clip-text " +
            "constantia group-hover:font-[family-name:var(--font-constantia-bold)] "
          }
        >
          {god.name}
        </span>
        <Image
          src={`/images/gods/${god.name.toLowerCase()}/watermark.webp`}
          width={256}
          height={643}
          alt=""
          className="fixed bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity -z-10"
        />
      </div>
    </Link>
  );
};
