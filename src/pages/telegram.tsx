// src/pages/telegram.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

declare global {
  interface Window {
    Telegram: any;
  }
}

const TelegramPage = () => {
  const [authData, setAuthData] = useState(null);
  const router = useRouter();

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
      console.log("Telegram WebApp initialized:", tg);
    } else {
      console.error("Telegram WebApp not available");
    }
  }, []);

  // useEffect(() => {
  //   if (typeof window !== "undefined" && window.Telegram) {
  //     fetchData();
  //   }
  // }, [router]);

  const getFetch = () => {
    alert(window.Telegram);
    if (typeof window !== "undefined" && window.Telegram) {
      fetchData();
    }
  };

  return (
    <div>
      <h1>Telegram Web App</h1>
      <button onClick={getFetch}>获取授权</button>
      {authData && (
        <div>
          <p>User ID: {authData.user.id}</p>
          <p>First Name: {authData.user.first_name}</p>
          <p>Last Name: {authData.user.last_name}</p>
          <p>Username: {authData.user.username}</p>
        </div>
      )}
    </div>
  );
};

export default TelegramPage;
