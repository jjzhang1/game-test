// src/pages/api/verifyTelegramAuth.js
import crypto from "crypto";
// import { InitData } from "@telegram-apps/init-data-node";

const botToken = "7033339300:AAEEt_MJUxuU9yMFeoTz6R7GwA27TfmfQWE";

export default function handler(req, res) {
  // if (req.method !== "POST") {
  //   return res.status(405).end(); // 方法不允许
  // }

  const { initData } = req.body;

  console.log("********", initData);

  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  params.delete("hash");

  const dataCheckString = Array.from(params.keys())
    .sort()
    .map((key) => `${key}=${params.get(key)}`)
    .join("\n");

  const secretKey = crypto
    .createHmac("sha256", "WebAppData")
    .update(botToken)
    .digest();
  const hmac = crypto
    .createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  if (hmac === hash) {
    // 验证成功
    return res.status(200).json({ success: true, data: { initData } });
  } else {
    // 验证失败
    return res.status(200).json({ success: false, data: { initData } });
  }
}
