import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';


export const initializeLoginFramework = () => {
   if (firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
   }
 }
 
  export const handleGoogleSignIn=()=>{
    // console.log('sign in clicked')
    const googleProvider = new firebase.auth.GoogleAuthProvider();
     return firebase.auth().signInWithPopup(googleProvider)
    .then(res=>{
      const {displayName, photoURL,email}=res.user;
      const signedInUser={
        isSignedIn:true,
        name:displayName,
        email:email,
        photo:photoURL,
        success:true
 
      }
      return signedInUser; 
      //console.log(displayName, photoURL,email);
    })
    .catch(err=>{
      console.log(err);
      console.log(err.message);
    })
   }

   export const handleFbSignIn=()=>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      user.success=true;
      return user;
     // console.log('fb user after sign in',user);
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(errorCode, errorMessage);
      // ...
    });
  }

  export const handleSignOut =()=>{
    //console.log('signOut Clicked');
     return firebase.auth().signOut()
    .then(res=>{
      const signedOutUser ={
        isSignedIn: false,
        name:"",
        photo:"",
        email:"",
        password:"",
        error:'',
        success: false
      }
      return signedOutUser;

    })
    .catch(err =>{
      console.log(err.message)

    });

  }
  export const createUserWithEmailAndPassword = (name,email,password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res =>{
      const newUserInfo=res.user;
      newUserInfo.error='';
      newUserInfo.success=true;
      //setUser(newUserInfo);
      //console.log(res)
      updateUserName(name);
      return newUserInfo;

    })
    .catch(error=> {
      // Handle Errors here.
      const newUserInfo={};
      newUserInfo.error=error.message;
      newUserInfo.success=false;
      return newUserInfo;
     // setUser(newUserInfo);
      //var errorCode = error.code;
     // var errorMessage = error.message;
      // ...
     // console.log(errorCode,errorMessage);
    });

  }

  export const signInWithEmailAndPassword = (email,password) => {
    return  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res =>{
      const newUserInfo=res.user
      newUserInfo.error='';
      newUserInfo.success=true;
      return newUserInfo;

     // setUser(newUserInfo);
     // console.log(res)
     //setLoggedInUser(newUserInfo);
     //history.replace(from);
     //console.log('sign in user info',res.user)

    })
    .catch(error=>{
      // Handle Errors here.
      const newUserInfo={};
      newUserInfo.error=error.message;
      newUserInfo.success=false;
      return newUserInfo;
      //setUser(newUserInfo);
      //var errorCode = error.code;
     // var errorMessage = error.message;
      // ...
    });
  }

const updateUserName = name =>{

    const user = firebase.auth().currentUser;
  
  user.updateProfile({
    displayName: name
  }).then(function() {
    console.log('user name updated successfully')
    // Update successful.
  }).catch(function(error) {
    console.log(error)
    // An error happened.
  });
  
  }



