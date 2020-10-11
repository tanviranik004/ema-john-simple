import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';

//firebase.initializeApp(firebaseConfig);

function Login() {
  const [newUser,setNewUser] = useState(false)
  const[user,setUser]= useState({
    isSignedIn: false,
    name:'',
    email:'',
    photo:''
  });

   
  initializeLoginFramework();
  const [loggedInUser,setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
   const googleSignIn = () =>{
    handleGoogleSignIn()
    .then(res=> {
      handleResponse(res,true)
      
    })
   }
   const signOut = () => {
     handleSignOut()
     .then(res =>{
       handleResponse(res,false)
     })
   }

   const fbSignIn = () =>{
     handleFbSignIn()
     .then(res =>{
        handleResponse(res,true);
     })
   }
    const handleResponse = (res,redirect) =>{
      setUser(res);
      setLoggedInUser(res); 
      if(redirect){
        history.replace(from);
      }
     

    }



  const handleBlur=(e) =>{
    //debugger;
    let isFormValid=true;
    console.log(e.target.value);
    if(e.target.name==='email'){
      //const isEmailValid= /\S+@\S+\.\S+/.test(e.target.value);
       isFormValid= /\S+@\S+\.\S+/.test(e.target.value);
      console.log(isFormValid)
    }
    if(e.target.name==='password'){
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      const isPasswordValid= e.target.value.length>6;
      isFormValid=isPasswordValid && passwordHasNumber;
      console.log(isPasswordValid && passwordHasNumber);
      
    }
      if (isFormValid){

        const newUserInfo = {...user};
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo)
      }
  }
const handleSubmit =(e)=>{
  //console.log(e.target.name, e.target.value)
  console.log(user.email,user.password)
  if(newUser && user.email && user.password){
    createUserWithEmailAndPassword(user.name, user.email,user.password)
    .then(res =>{
      handleResponse(res,true)
    })
     //console.log('submitting')
  }
  if(!newUser && user.email && user.password){ 
    signInWithEmailAndPassword(user.email, user.password)
    .then(res =>{
      handleResponse(res,true)
    })
  }
  e.preventDefault();
}

  return (
    <div style={{textAlign:'center'}} >
    {  
      user.isSignedIn ? <button onClick={signOut}>sign-out</button>:
     <button onClick={googleSignIn}>sign-in</button>
    }
    <br/>
      <button onClick={fbSignIn}>Sign in using Facebook</button>

      {
        user.isSignedIn &&<div>
          <p>Welcome,{user.name}</p>
      <p>Your email: {user.email}</p>
      <img src={user.photo} alt=""/>
          </div>

      }
      <h1>Our own Authentication</h1>
      <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id=""/>

      <label htmlFor="newUser">New User Sign Up</label>
    
      <form onSubmit={handleSubmit}>
       {newUser && <input name="name" type="text" onBlur={handleBlur}   placeholder="your name"/>}
        <br/>
      <input type="text" name="email"  onBlur={handleBlur}  placeholder="Your Email address" required></input>
      <br/>
      <input type="password" name="password"  onBlur={handleBlur}   id='' placeholder="Your password" required></input>
      <br/>
        <input type="submit" value={newUser ? 'Sign up' : 'Sign in'}/>
      </form>
    <p style={{color:'red'}}>{user.error}</p>{user.success && 
  <p style={{color:'green'}}>User {newUser? 'created' : 'Logged In'} Successfully</p>}

     
    </div>
  );
}

export default Login;
