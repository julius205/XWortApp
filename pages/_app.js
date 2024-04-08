import "@/styles/globals.css";
import HomePageButton from "@/components/HomePageButton";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <HomePageButton />
      <Component {...pageProps} />
    </div>
  );
}
