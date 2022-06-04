import { Footer, Navbar } from "../components";
import Layout from "../layout";
import "../styles/globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </Layout>
  );
}

export default MyApp;
