import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import Script from "next/script";
export default function Main() {
  const [authData, setAuthData] = useState(null);
  const iframeRef = useRef(null);

  const fetchData = () => {
    // 自动获取token认证信息
    const tg = window.Telegram.WebApp;
    const initData = tg.initData || "";
    const initDataUnsafe = tg.initDataUnsafe || {};

    setAuthData({
      queryId: initDataUnsafe.query_id,
      user: initDataUnsafe.user,
      authDate: initDataUnsafe.auth_date,
      hash: initDataUnsafe.hash,
    });

    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage(
        initDataUnsafe,
        window.location.origin
      );
    }

    // 将initData发送到您的后端进行验证和处理
    fetch("/api/verifyTelegramAuth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ initData }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("验证成功");
        } else {
          console.log("验证失败");
        }
      });
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      fetchData();
      console.log("Telegram WebApp initialized:", tg);
    } else {
      console.error("Telegram WebApp not available");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Balance</title>
      </Head>
      <div style={{ width: "100%", height: "100vh", margin: 0, padding: 0 }}>
        <div id="content"></div>
        <iframe
          src="/index.html"
          ref={iframeRef}
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
