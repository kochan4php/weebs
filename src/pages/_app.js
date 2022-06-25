import { useEffect } from "react";
import { Footer, Navbar } from "../components";
import Layout from "../layout";
import "../styles/globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    if (typeof Storage === "undefined") {
      localStorage.setItem("anime-selected", "/seasons/now");
      localStorage.setItem("title-anime", "Airing Now");
    }
  }, []);

  return (
    <Layout>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </Layout>
  );
};

export default MyApp;
