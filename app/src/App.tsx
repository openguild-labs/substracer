import React from "react";
import { Helmet } from "react-helmet";
import { HashRouter as Router } from "react-router-dom";
import "./App.css";
import AppProvider from "./AppProvider";
import { BRAND_LOGO_CONSTRAST } from "./constants";
import AppRouter from "./AppRouter";

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title lang="en">substracer</title>
        <html lang="en" />
        <link rel="canonical" href="https://substracer/" />
        <meta
          name="description"
          content="All-in-one tab & link management platform"
        />
        <meta name="keywords" content="productivity, link, software" />
        <link rel="apple-touch-icon" href={`/${BRAND_LOGO_CONSTRAST}`} />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href={`/${BRAND_LOGO_CONSTRAST}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://app.substracer/" />
        <meta property="og:title" content="UpChart" />
        <meta
          property="og:description"
          content="All-in-one tab & link management platform"
        />
      </Helmet>
      <AppProvider>
        <Router>
          <AppRouter />
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
