import { initializeApp } from 'firebase/app';
import { initializeFirestore, doc, getDocFromServer } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD4ru-Vz-Pil1loBuQqSnpLs4pkKvjAchY",
  authDomain: "sktmobile-app.firebaseapp.com",
  projectId: "sktmobile-app",
  storageBucket: "sktmobile-app.firebasestorage.app",
  messagingSenderId: "838975213936",
  appId: "1:838975213936:web:c159fcfd8550bf58247fb5"
};

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

// Validate connection to Firestore on boot
const testConnection = async () => {
  try {
    // Attempting to fetch a non-existent doc just to force a network trip
    await getDocFromServer(doc(db, '_connection_test_', 'ping'));
    console.log("Firestore connection successful.");
  } catch (error) {
    if (error instanceof Error && error.message.includes('unavailable')) {
      console.warn("Firestore unavailable. Check your internet or Firebase console status.");
    } else {
      console.log("Firestore connection test completed (ignoring standard doc not found errors).");
    }
  }
};

testConnection();
