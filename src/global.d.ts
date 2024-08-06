interface Window {
  okxwallet?: any;
  rainbow?: any;
  coinbaseWallet?: any;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
  