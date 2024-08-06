import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../redux/store";
import { Provider, useDispatch } from "react-redux";

import React, { useState, useEffect } from "react";
import { Head } from "next/document";

function App({ Component, pageProps, router }: AppProps) {
  const dispatch = useDispatch();

  const getLayout = () => {
    const allowedPaths = ["/home"];
    if (allowedPaths.includes(router.pathname)) {
      return <Component {...pageProps} />;
    }
    return (
      <div>
        <Component {...pageProps} />
      </div>
    );
  };
  return getLayout();
}

export default store.withRedux(App);
