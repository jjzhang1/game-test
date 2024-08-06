// src/pages/api/verifyTelegramAuth.js
import crypto from "crypto";
import { validate } from "@telegram-apps/init-data-node";

const secret = "7033339300:AAEEt_MJUxuU9yMFeoTz6R7GwA27TfmfQWE";

export default function handler(req, res) {
  // if (req.method !== "POST") {
  //   return res.status(405).end(); // 方法不允许
  // }

  const { initData, initDataUnsafe } = req.body;

  const { auth_date, first_name, id, last_name, username, hash } =
    initDataUnsafe;

  // const initDataUnsafe = initData;
  console.log("+++++++++++++", initData);

  const dataCheckString = [
    `auth_date=${auth_date}`,
    `first_name=${first_name}`,
    `id=${id}`,
    `last_name=${last_name}`,
    `username=${username}`,
  ]
    .sort()
    .join("\n");

  // 计算密钥
  const secret = crypto.createHash("sha256").update(secret).digest();

  // 计算哈希值
  const hmac = crypto
    .createHmac("sha256", secret)
    .update(dataCheckString)
    .digest("hex");

  // const calHash = validate(initData, secret);

  console.log("*************", hmac, initDataUnsafe);

  if (hmac === hash) {
    // 验证成功
    return res.status(200).json({ success: true, data: { initData } });
  } else {
    // 验证失败
    return res.status(403).json({ success: false, data: { initData } });
  }
}
