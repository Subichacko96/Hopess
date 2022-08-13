import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const ConfigFile = require("./config");
const firebaseConfig = ConfigFile.firebaseConfig;
const app = initializeApp(firebaseConfig);

if(getApps.length === 0) {
    initializeApp(firebaseConfig);
}
export const analytics = getAnalytics(app)