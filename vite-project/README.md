import React from 'react';

export default function FacebookButton() {
  const facebookAppScheme = "youtube://watch?v=TGmjaK_dUGc&list=PLhfrWIlLOoKMdraxMXcoTpT7sXlQNVWX4";
  const playstoreURL = "https://play.google.com/store/apps/details?id=com.facebook.katana";
  const appstoreURL = "https://apps.apple.com/us/app/facebook/id284882215";
  
  const getPlatform = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      return "android";
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "ios";
    }
    return "unknown";
  };
  
  const handleButtonClick = () => {
    const confirmation = window.confirm("Do you want to open the Facebook app?");
    if (!confirmation) {
      return;
    }
    
    const platform = getPlatform();
    
    // First try to open the app using the deep link
    const now = Date.now();
    const openApp = () => {
      window.location.href = facebookAppScheme;
    };
    
    // Set up the fallback in case the app isn't installed
    const checkAndRedirect = () => {
      // If we're still on the same page after a brief delay, app isn't installed
      if (Date.now() - now < 2200) {
        if (platform === "android") {
          window.location.href = playstoreURL;
        } else if (platform === "ios") {
          window.location.href = appstoreURL;
        } else {
          alert("Please install the Facebook app from your respective store");
        }
      }
    };
    
    // iOS requires a timeout before trying to open the app
    if (platform === "ios") {
      setTimeout(openApp, 100);
      setTimeout(checkAndRedirect, 2000);
    } else {
      openApp();
      setTimeout(checkAndRedirect, 2000);
    }
  };
  
  return (
    <button
      className="p-4 text-lg bg-blue-600 text-white cursor-pointer rounded-lg hover:bg-blue-700 transition-colors"
      onClick={handleButtonClick}
    >
      Open Facebook
    </button>
  );
}