import { Footer, Navbar } from "../components";
import Layout from "../layout";
import "../styles/globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

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
