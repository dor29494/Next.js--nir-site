import * as firebaseAdmin from "firebase-admin";
const privateKey = process.env.privateKey.replace(/\\n/g, '\n');
const clientEmail = process.env.clientEmail;
const projectId = process.env.projectId;

if (!privateKey || !clientEmail || !projectId) {
    console.log(
      `Failed to load Firebase credentials. Follow the instructions in the README to set your Firebase credentials inside environment variables.`
    );
  }
  if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        privateKey: privateKey,
        clientEmail: clientEmail,
        projectId: projectId,
      }),
      databaseURL: `https://${projectId}.firebaseio.com`,
    });
  }
  export { firebaseAdmin };
