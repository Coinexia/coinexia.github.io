// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDJmHmlTwvpDwEt3EJc6KVpi4X8meZeffc",
  authDomain: "coinexia-748b6.firebaseapp.com",
  projectId: "coinexia-748b6",
  storageBucket: "coinexia-748b6.appspot.com",
  messagingSenderId: "235020899567",
  appId: "1:235020899567:web:0d4b031bb45ee6990a371a"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Show total user count
async function showUserCount() {
  const snapshot = await db.collection('users').get();
  const count = snapshot.size;
  document.getElementById('userCount').textContent = `Total users: ${count}`;
}

// Show runtime since launch
function showRuntime() {
  const launchDate = new Date('2024-06-01'); // Set your actual launch date
  const now = new Date();
  const diff = now - launchDate;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById('runtime').textContent = `Running for ${days} days`;
}

// Login with Google
window.login = function() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      alert(`Welcome, ${user.displayName}`);
    })
    .catch(error => {
      console.error('Login failed:', error);
    });
};

// Run on load
showUserCount();
showRuntime();
