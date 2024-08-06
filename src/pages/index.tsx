import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import Spline from "@splinetool/react-spline";
export default function Main() {
  return (
    <>
      <Head>
        <title>Balance</title>
      </Head>
      <div style={{ width: "100%", height: "100vh", margin: 0, padding: 0 }}>
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
