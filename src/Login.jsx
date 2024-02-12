import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import auth from "./firebase";
import { useNavigate } from "react-router-dom";
import './assets/css/Login.css';

function Login() {
  const navigate = useNavigate();


    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            navigate("/");
            // IdP data available using getAdditionalUserInfo(result)
            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
  
  };

  return (
    <>
    <div className="container-form">
        <div className="wrapper">
            <div className="card-switch">
                <label className="switch">
                    <input type="checkbox" className="toggle" />
                    <span className="slider"></span>
                    <span className="card-side"></span>
                    <div className="flip-card__inner">
                        <div className="flip-card__front">
                            <div className="title">Log in</div>
                                <form className="flip-card__form" action="">
                                    <input className="flip-card__input" name="email" placeholder="Email" type="email" />
                                    <input className="flip-card__input" name="password" placeholder="Password" type="password" />
                                    <button className="flip-card__btn">Let`s go!</button>
                                </form>
                            </div>
                            
                            <div className="flip-card__back">
                                <div className="title">Sign up</div>
                                    <form className="flip-card__form" action="">
                                        <input className="flip-card__input" placeholder="Name" type="text" />
                                        <input className="flip-card__input" name="email" placeholder="Email" type="email" />
                                        <input className="flip-card__input" name="password" placeholder="Password" type="password" />
                                        <button className="flip-card__btn">Confirm!</button>
                                    </form>
                                </div>
                            </div>
                </label>
            </div>
        </div>
    </div>
      

       <div>
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    </>

  );
}

export default Login;
