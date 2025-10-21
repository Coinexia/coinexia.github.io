// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDJmHmlTwvpDwEt3EJc6KVpi4X8meZeffc",
  authDomain: "coinexia-748b6.firebaseapp.com",
  projectId: "coinexia-748b6",
  storageBucket: "coinexia-748b6.firebasestorage.app",
  messagingSenderId: "235020899567",
  appId: "1:235020899567:web:0d4b031bb45ee6990a371a"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Add points to user
window.addPoints = async function(username, amount) {
  const userRef = db.collection('users').doc(username);
  const doc = await userRef.get();

  if (!doc.exists) {
    console.error('User not found');
    return;
  }

  const currentPoints = doc.data().points || 0;
  const newPoints = currentPoints + amount;

  await userRef.update({ points: newPoints });
  console.log(`Points updated: ${newPoints}`);
};
