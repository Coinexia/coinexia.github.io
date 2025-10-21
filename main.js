// Firebase v8 config — replace with your actual values
const firebaseConfig = {
  apiKey: "AIzaSyDJmHmlTwvpDwEt3EJc6KVpi4X8meZeffc",
  authDomain: "coinexia-748b6.firebaseapp.com",
  projectId: "coinexia-748b6",
  storageBucket: "coinexia-748b6.firebasestorage.app",
  messagingSenderId: "235020899567",
  appId: "1:235020899567:web:0d4b031bb45ee6990a371a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Add points to user
window.addPoints = async function(username, amount) {
  const userRef = db.collection('users').doc(username);
  const doc = await userRef.get();

  if (!doc.exists) {
    console.error('User not found');
    document.getElementById('pointsDisplay').textContent = 'User not found';
    return;
  }

  const currentPoints = doc.data().points || 0;
  const newPoints = currentPoints + amount;

  await userRef.update({ points: newPoints });
  console.log(`Points updated: ${newPoints}`);
  document.getElementById('pointsDisplay').textContent = `Current Points: ${newPoints}`;
};

// Check current points
window.checkPoints = async function(username) {
  const userRef = db.collection('users').doc(username);
  const doc = await userRef.get();

  if (!doc.exists) {
    console.error('User not found');
    document.getElementById('pointsDisplay').textContent = 'User not found';
    return;
  }

  const currentPoints = doc.data().points || 0;
  document.getElementById('pointsDisplay').textContent = `Current Points: ${currentPoints}`;
};
