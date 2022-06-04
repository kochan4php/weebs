import Head from "next/head";
import Script from "next/script";

const Layout = ({ children }) => (
  <div>
    <Head>
      <title>Hibike! Euphonium</title>
      <meta name="description" content="Hibike! Euphonium" />
      <link rel="icon" href="/icon/logo-hibike-euphonium.png" />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      <meta name="keywords" content="Hibike Euphonium" />
      <link
        href="https://fonts.googleapis.com/css?family=Lexend+Deca:100,200,300,regular,500,600,700,800,900"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/tw-elements/dist/css/index.min.css"
      />
    </Head>
    {children}
    <Script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js"></Script>
  </div>
);

export default Layout;
