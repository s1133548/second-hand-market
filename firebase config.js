// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-storage.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDr1I8gvzidt-RTFCDuLvv_pxwjUQpuvVg",
  authDomain: "second-hand-market-ac9f1.firebaseapp.com",
  databaseURL: "https://second-hand-market-ac9f1-default-rtdb.firebaseio.com",
  projectId: "second-hand-market-ac9f1",
  storageBucket: "second-hand-market-ac9f1.firebasestorage.app",
  messagingSenderId: "346650617019",
  appId: "1:346650617019:web:2ed646f43df061ec72b59e",
  measurementId: "G-PM2Y1WXTDW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getDatabase(app);
