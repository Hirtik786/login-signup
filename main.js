let email = document.getElementById("email");
let password = document.getElementById("password");
let email1 = document.getElementById("email1");
let password1 = document.getElementById("password1");
let message = document.getElementById("message");
let message1 = document.getElementById("message1");
let message2 = document.getElementById("message2");

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     var uid = user.uid;
//     console.log("current user", uid);
//     window.location.assign("homepage.html")
//     // ...
//   } else {
//     // User is signed out
//     window.location.assign("index.html")
//   }
// });

let createAccount = () => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email1.value, password1.value)
    .then((userCredential) => {
      console.log("Account Created");
      var user = userCredential.user;
      console.log(user);
      message.style.color = "green";
      message.innerHTML = "Account Created Successfully";
      setTimeout(() => {
        message.style.display = "none";
      }, 1000);
      setTimeout(() => {
        if (user.emailVerified == true) {
          window.location.assign("homepage.html");
          console.log("Email verified", "Signed in");
        } else {
          window.location.assign("verification.html");
        }
      }, 2000);
    })
    .catch((error) => {
      console.log("error", error.message);
      message.style.display = "block";
      message.innerHTML = error.message;
      setTimeout(() => {
        message.style.display = "none";
      }, 1000);
    });
};

let login = () => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      console.log("Signed In");
      var user = userCredential.user;
      console.log(user);
      message1.style.display = "block";
      message1.style.color = "green";
      message1.innerHTML = "Account login Successfully";
      setTimeout(() => {
        message1.style.display = "none";
      }, 1000);
      setTimeout(() => {
        if (user.emailVerified == true) {
          window.location.assign("homepage.html");
          console.log("Email verified", "Signed in");
        } else {
          window.location.assign("verification.html");
        }
      }, 2000);
    })
    .catch((error) => {
      console.log("error", error.message);
      message1.style.display = "block";
      message1.innerHTML = error.message;
      setTimeout(() => {
        message1.style.display = "none";
      }, 1000);
    });
};

let forgotPassword = () => {
  let resetPasswordEmail = document.getElementById("resetPasswordEmail");
  firebase
    .auth()
    .sendPasswordResetEmail(resetPasswordEmail.value)
    .then(() => {
      console.log("Email Sent Successfully");
    })
    .catch((error) => {
      console.log("error", error.message);
    });
};
let sendVerificationEmail = () => {
  firebase.auth().currentUser.sendEmailVerification()
    .then(() => {
      console.log("Email verification sent!");
      message2.style.display = "block"
      message2.style.color = "green"
      message2.innerHTML = "Verification email sent successfully"
    });
};

let logOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Sign-out successful");
      window.location.assign("index.html");
    })
    .catch((error) => {
      console.log("error", error.message);
    });
};

let deleteAccount = () => {
  const user = firebase.auth().currentUser;

  user
    .delete()
    .then(() => {
      console.log("User deleted");
      window.location.assign("index.html");
    })
    .catch((error) => {
      console.log("error", error);
    });
};

let loginWithGoogle = () => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      var token = credential.accessToken;
      var user = result.user;
      console.log("login with google done", user);
      console.log(provider);
      window.location.assign("homepage.html");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log("login with google error");
      // ...
    });
};
