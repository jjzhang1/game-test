import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import Script from "next/script";
export default function Main() {
  // useEffect(() => {
  //   fetch("/index.html")
  //     .then((response) => response.text())
  //     .then((data) => {
  //       document.getElementById("content").innerHTML = data;
  //     });
  // }, []);

  return (
    <>
      <Head>
        <title>Balance</title>
      </Head>
      <div style={{ width: "100%", height: "100vh", margin: 0, padding: 0 }}>
        <div id="content"></div>
        {/* <Script src="/index.html" strategy="beforeInteractive" /> */}
        <iframe
          src="/index.html"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            margin: 0,
            padding: 0,
            display: "block",
          }}
        />
      </div>
    </>
  );
}
