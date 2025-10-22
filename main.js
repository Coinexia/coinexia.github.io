// Firebase v8 config — replace with your actual values
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
const auth = firebase.auth();

let currentUser = null;

// Login with Google
window.login = function() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      currentUser = result.user;
      document.getElementById('userStatus').textContent = `Signed in as ${currentUser.displayName}`;
      document.querySelectorAll('button[disabled]').forEach(btn => btn.disabled = false);
    })
    .catch(error => {
      console.error('Login failed:', error);
    });
};

// Add points to current user
window.addPoints = async function() {
  if (!currentUser) return;

  const username = currentUser.uid;
  const userRef = db.collection('users').doc(username);
  const doc = await userRef.get();

  const currentPoints = doc.exists ? doc.data().points || 0 : 0;
  const newPoints = currentPoints + 10;

  await userRef.set({ points: newPoints }, { merge: true });
  document.getElementById('pointsDisplay').textContent = `Current Points: ${newPoints}`;
};

// Check current points
window.checkPoints = async function() {
  if (!currentUser) return;

  const username = currentUser.uid;
  const userRef = db.collection('users').doc(username);
  const doc = await userRef.get();

  const currentPoints = doc.exists ? doc.data().points || 0 : 0;
  document.getElementById('pointsDisplay').textContent = `Current Points: ${currentPoints}`;
};
