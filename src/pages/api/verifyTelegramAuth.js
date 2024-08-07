// src/pages/api/verifyTelegramAuth.js
import crypto from "crypto";
import { validate } from "@telegram-apps/init-data-node";

const botToken = "7033339300:AAEEt_MJUxuU9yMFeoTz6R7GwA27TfmfQWE";

export default function handler(req, res) {
  // if (req.method !== "POST") {
  //   return res.status(405).end(); // 方法不允许
  // }

  const { initData, initDataUnsafe } = req.body;

  // {
  //   user: {
  //     id: 2075161842,
  //     first_name: 'Eden',
  //     last_name: 'Zhang',
  //     username: 'edenjjzhang',
  //     language_code: 'zh-hans',
  //     allows_write_to_pm: true
  //   },
  //   chat_instance: '-5145982372181983218',
  //   chat_type: 'private',
  //   auth_date: '1722936526',
  //   hash: '32d7bd14afd4b395d3bc9730c73ab9db44118bf89803050d252ba612d570eed5'
  // }

  const { auth_date, user, hash } = initDataUnsafe;
  const { first_name, id, last_name, username, photo_url = "" } = user;

  // const initDataUnsafe = initData;

  // auth_date=<auth_date>\nfirst_name=<first_name>\nid=<id>\nusername=<username>

  const reset = {
    auth_date,
    first_name,
    id,
    last_name,
    username,
    photo_url,
  };

  const dataCheckString = Object.keys(reset)
    .sort()
    .map((key) => `${key}=${reset[key]}`)
    .join("\n");

  console.log("+++++++++++++", dataCheckString);

  // 计算密钥
  const secret = crypto.createHash("sha256").update(botToken).digest();

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
    return res.status(200).json({ success: false, data: { initData } });
  }
}
