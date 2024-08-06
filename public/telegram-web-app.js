// public/telegram-web-app.js
(function () {
  if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.expand();

    tg.MainButton.text = "Click me";
    tg.MainButton.show();
    tg.MainButton.onClick(() => {
      tg.sendData("Button clicked");
    });
  }
})();
