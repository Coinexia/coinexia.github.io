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
  const currentYear = new Date().getFullYear();
  document.getElementById('runtime').textContent = `Established ${currentYear}`;
}

// Show top user and their points
async function showTopUser() {
  const snapshot = await db.collection('users').orderBy('points', 'desc').limit(1).get();
  if (!snapshot.empty) {
    const topUser = snapshot.docs[0].data();
    const name = topUser.displayName || "Anonymous";
    const points = topUser.points || 0;
    const statText = `Top user: ${name} with ${points} points`;
    const statElement = document.createElement('p');
    statElement.textContent = statText;
    statElement.style.marginTop = '20px';
    statElement.style.fontSize = '1.1em';
    document.querySelector('footer').appendChild(statElement);
  }
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
showTopUser();
