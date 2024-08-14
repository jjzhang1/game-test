import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/Home.module.css";
import Head from "next/head";

declare global {
  interface Window {
    Telegram: any;
  }
}
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

    console.log("开始请求数据", initDataUnsafe);

    // 将initData发送到您的后端进行验证和处理
    fetch("/api/get_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ initData }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          initDataUnsafe.now = Date.now();
          window.localStorage.setItem(
            "tg_auth_user_info",
            JSON.stringify(initDataUnsafe)
          );
          console.log("验证成功");
        } else {
          console.log("验证失败");
        }
      });
  };

  useEffect(() => {
    // Ensure the Telegram WebApp script is loaded
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    script.onload = () => {
      const tg = window.Telegram.WebApp;
      tg.ready();

      setTimeout(() => {
        fetchData();
      }, 0);
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Balance</title>
      </Head>
      <div style={{ width: "100%", height: "100vh", margin: 0, padding: 0 }}>
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
