import React from "react";
import Link from "next/link";

const SelectDifficulty = () => {
  return (
    <div className="flex flex-col text-center items-center justify-center h-screen">
      <h1 className="text-3xl font-extrabold mb-20 text-[#3a3a3a]">
        Wähle eine Schwierigkeitsstufe:
      </h1>
      <div className="flex flex-col items-center justify-center text-xl">
        <Link
          href="/play?difficulty=leicht"
          className="bg-[#537a4d] hover:bg-[#3a5536] w-36  text-white font-bold py-4 px-6 mb-4 rounded"
        >
          Leicht
        </Link>
        <Link
          href="/play?difficulty=mittel"
          className="bg-[#5a5095] hover:bg-[#423b6c] w-36  text-white font-bold py-4 px-6 mb-4 rounded"
        >
          Mittel
        </Link>
        <Link
          href="/play?difficulty=schwer"
          className="bg-[#89382d] hover:bg-[#552f2a] w-36  text-white font-bold py-4 px-6 mb-4 rounded"
        >
          Schwer
        </Link>
      </div>
    </div>
  );
};

export default SelectDifficulty;
