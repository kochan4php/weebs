import { RecoilRoot } from "recoil";
import Layout from "../layout";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => (
  <RecoilRoot>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </RecoilRoot>
);

export default MyApp;
