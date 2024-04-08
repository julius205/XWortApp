import Link from "next/link";
import { FaHome } from "react-icons/fa"; // Importiere das Home-Icon

const HomePageButton = () => {
  return (
    <div className="homepage-button-container">
      <Link href="/">
        <div className="bg-[#e6c6a2] p-2 rounded-2xl">
          <FaHome className="sm:w-10 sm:h-10 w-8 h-8 bg-[#e6c6a2]" />
        </div>
      </Link>
    </div>
  );
};

export default HomePageButton;
