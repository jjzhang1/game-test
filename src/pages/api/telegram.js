// src/pages/api/telegram.js
import { buffer } from "micro";
import fetch from "node-fetch";

// 禁用默认的bodyParser以便我们可以手动处理请求体
export const config = {
  api: {
    bodyParser: false,
  },
};

const token = "7033339300:AAEEt_MJUxuU9yMFeoTz6R7GwA27TfmfQWE"; // 在环境变量中设置您的Bot Token

const webhookHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).end(); // 方法不允许
    return;
  }

  const buf = await buffer(req);
  const message = JSON.parse(buf.toString());

  if (message && message.message) {
    const chatId = message.message.chat.id;
    const text = "Hello, World!";

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
      }),
    });
  }

  res.status(200).end();
};

export default webhookHandler;
