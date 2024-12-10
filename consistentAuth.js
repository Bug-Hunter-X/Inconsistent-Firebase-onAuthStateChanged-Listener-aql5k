function setupAuthListener() {
  // Enhanced onAuthStateChanged listener with error handling and retry logic
  firebase.auth().onAuthStateChanged(
    (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log('User signed in with UID:', uid);
        updateUI(user);
      } else {
        // User is signed out
        console.log('User is signed out');
        updateUI(null);
      }
    },
    (error) => {
      console.error('Error in onAuthStateChanged:', error);
      // Implement retry logic if needed
      setTimeout(setupAuthListener, 5000); // Retry after 5 seconds
    }
  );
}

function updateUI(user) {
  // Update UI based on user status
  if (user) {
    document.getElementById('user-info').innerText = `UID: ${user.uid}`;
  } else {
    document.getElementById('user-info').innerText = 'User not logged in';
  }
}

setupAuthListener();