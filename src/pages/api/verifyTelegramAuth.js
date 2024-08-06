// src/pages/api/verifyTelegramAuth.js
import crypto from "crypto";

const secret = "7033339300:AAEEt_MJUxuU9yMFeoTz6R7GwA27TfmfQWE";

export default function handler(req, res) {
  // if (req.method !== "POST") {
  //   return res.status(405).end(); // 方法不允许
  // }

  const { initData } = req.body;
  const checkString = initData
    .split("&")
    .filter((x) => !x.startsWith("hash"))
    .sort()
    .join("\n");
  const secretKey = crypto.createHash("sha256").update(secret).digest();
  const hash = crypto
    .createHmac("sha256", secretKey)
    .update(checkString)
    .digest("hex");

  console.log("*************", hash);
  console.log("+++++++++++++", req?.body);

  if (hash === req?.body?.initDataUnsafe?.hash) {
    // 验证成功
    return res.status(200).json({ success: true });
  } else {
    // 验证失败
    return res.status(403).json({ success: false });
  }
}
