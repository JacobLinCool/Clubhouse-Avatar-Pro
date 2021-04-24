function service_register() {
  if ("serviceWorker" in navigator) {
    console.log("[service register] service worker available.");
    navigator.serviceWorker.register("/sw.js");
  }
}

export { service_register };
