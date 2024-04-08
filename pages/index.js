import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-screen flex flex-col text-center items-center justify-center h-screen">
      <h1 className="text-7xl font-extrabold mb-4 text-[#322E38]">XWort</h1>
      <p className="text-lg font-bold mb-12 text-[#322E38]">
        Der Kreuzworträtsel-Trainer
      </p>
      <div className="flex flex-col gap-4">
        <Link href="/selectDifficulty">
          <p className="bg-[#322E38] hover:bg-[#23221f] text-white font-bold py-2.5 px-6 rounded-2xl text-2xl">
            Spielen
          </p>
        </Link>
      </div>
    </div>
  );
}
