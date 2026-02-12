export function isSafari() {
  return (
    navigator.vendor &&
    navigator.vendor.includes("Apple") &&
    !navigator.userAgent.includes("CriOS") &&
    !navigator.userAgent.includes("FxiOS")
  );
}

export function isMobileDevice() {
  // Under 768px width, we consider it a mobile device
  console.log("TEST MOBILE", window.innerWidth);
  return window.innerWidth < 768;
}
