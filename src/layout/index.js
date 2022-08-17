import Head from "next/head";
import PropTypes from "prop-types";
import { Footer, Navbar } from "../components";

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Weebs</title>
      <meta name="description" content="" />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
    </Head>
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
