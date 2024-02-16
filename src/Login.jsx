import { GoogleAuthProvider, GithubAuthProvider ,signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import auth from './firebase';
import './assets/css/Login.css';

function Login() {
  const navigate = useNavigate();
  const [errorPorCorreoExisitente, seterrorPorCorreoExisitente] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const auth = getAuth();


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

    function signInWithGithub(){
        const providerGithub = new GithubAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, providerGithub)
          .then((result) => {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            navigate("/");
            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GithubAuthProvider.credentialFromError(error);
            if (error.code === 'auth/account-exists-with-different-credential') {
              seterrorPorCorreoExisitente('Ya existe un usuario con la misma dirección de correo electrónico pero con diferentes credenciales de inicio de sesión.');
            }
            console.log(error.code);
            // ...
          });
    }

    function registrarse(e) {
      e.preventDefault();
      createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              console.log("Registrado");
              const user = userCredential.user;
              user.displayName = name;
              // Aquí podrías hacer algo con el nombre, como actualizar el perfil del usuario
              updateProfile(user, {
                displayName: name,
              }).then(() => {
                navigate("/");
              }).catch((error) => {
                // Ocurrió un error
                console.log(error);
              });
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode);
              if (errorCode === 'auth/email-already-in-use') {
                seterrorPorCorreoExisitente('Ya existe un usuario con la misma dirección de correo electrónico.');
              }
          });
    }


    function iniciarSesionEmail(e) {
      e.preventDefault();
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          navigate("/");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
        });
    }

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
                                {errorPorCorreoExisitente && <p>{errorPorCorreoExisitente}</p>}
                                <button className="button-login" onClick={signInWithGoogle}>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                </svg>
                                  Continue with Google
                                </button>
                                <button className="button-login" onClick={signInWithGithub}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                  Continue with Github
                                </button>
                                    <form className="flip-card__form" action="">
                                        <input type="email" className="flip-card__input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                                        <input type="password" className="flip-card__input" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                                        <button className="flip-card__btn" onClick={iniciarSesionEmail}>Let`s go!</button>
                                    </form>
                                </div>
                            
                                <div className="flip-card__back">
                                  <div className="title">Sign up</div>
                                  {errorPorCorreoExisitente && <p>{errorPorCorreoExisitente}</p>}
                                  <form className="flip-card__form" action="">
                                    <input className="flip-card__input" placeholder="Name" type="text" value={name} onChange={e => setName(e.target.value)} />
                                    <input className="flip-card__input" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                                    <input className="flip-card__input" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                                    <button className="flip-card__btn" onClick={registrarse}>Confirm!</button>
                                  </form>
                                </div>
                                </div>
                    </label>
                </div>
            </div>
        </div>
      
    </>

  );
}
export default Login;
