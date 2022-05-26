import * as firebaseAdmin from "firebase-admin/app";

const serviceAccount = require("../secrets.json");

if (!firebaseAdmin.getApps().length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.cert(serviceAccount),
  });
}

export { firebaseAdmin };
