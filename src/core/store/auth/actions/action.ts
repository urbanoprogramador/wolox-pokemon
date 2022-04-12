import { asyncTodos, IUser, typeAuth } from "../reducers/reducer";
import { asyncMac, mac } from "../../utils/configReducer";


import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase-config";

const [
  actionAuthPending,
  actionAuthError,
  actionAuthSuccess
] = asyncMac(asyncTodos);

interface IActionLogin{
  payload:IUser
};


export const actionAuthUser = mac<IActionLogin>(typeAuth.login /* , 'payload' */ );
export const actionAuthLogout = mac<null>(typeAuth.logout);



export const actionClearAuth = () => (dispatch:Function) => {
  dispatch(actionAuthLogout(null));
  localStorage.removeItem('user');
}

export const asyncStartGoogleLogin = () => (dispatch:Function) => {
  dispatch(actionAuthPending());
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = (result.user as any);

      dispatch(actionAuthUser({
        payload:{
        displayName: user.displayName,
        email: user.email,
        token: user.accessToken
        }
      }));
      localStorage.setItem('user', JSON.stringify({
        displayName: user.displayName,
        email: user.email,
        token: user.accessToken,
      }));
      dispatch(actionAuthSuccess());


      // ...
    }).catch((error) => {

      //auth/popup-closed-by-user
      if (error.code === "auth/popup-closed-by-user") {
        dispatch(actionAuthError("ventana cerrada por el usuario "));
      } else {
        dispatch(actionAuthError("Error Desconocido "));
      }

    });
}

export const asyncCreateUserWithEmailAndPassword = ({ email, password, displayname }:{email:string,password:string,displayname:string}) => (dispatch:Function) => {
  dispatch(actionAuthPending());

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      auth.currentUser &&
        updateProfile(auth.currentUser, {
          displayName: displayname
        }).then(() => {
          // Profile updated!
          // ...
          const user = (userCredential.user as any);
          dispatch(actionAuthUser({
            payload:{
              displayName: user.displayName,
              email: user.email,
              token: user.accessToken,
            }
          }));
          localStorage.setItem('user', JSON.stringify({
            displayName: user.displayName,
            email: user.email,
            token: user.accessToken,
          }));
          dispatch(actionAuthSuccess());
        }).catch((error) => {
          console.log(error);
        });

      // ...
    })
    .catch((error) => {

      if (error.code === "auth/email-already-in-use" || error.code === "auth/user-not-found") {
        dispatch(actionAuthError("Usuario ya se encuentra registrado"));
      } else {
        dispatch(actionAuthError("Error Desconocido "));
      }
    });

}


export const asyncLoginEmailAndPassword = ({ email, password }:{email:string,password:string}) => (dispatch:Function) => {
  dispatch(actionAuthPending());
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = (userCredential.user as any);
      dispatch(actionAuthUser({
        payload:{
          displayName: user.displayName,
            email: user.email,
            token: user.accessToken,
        }
      }));
      localStorage.setItem('user', JSON.stringify({
        displayName: user.displayName,
        email: user.email,
        token: user.accessToken,
      }));
      dispatch(actionAuthSuccess());
      // ...
    })
    .catch((error) => {

      /* 
      "auth/wrong-password"
      auth/user-not-found
      */

      if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
        dispatch(actionAuthError("Usuario o contraseña invalido"));
      } else {
        dispatch(actionAuthError("Error Desconocido "));
      }
    });
}

export const asyncSignOut = () => (dispatch:Function) => {
  dispatch(actionAuthPending());
  signOut(auth).then(() => {
    dispatch(actionClearAuth());
    dispatch(actionAuthSuccess());
  }).catch((error) => {
    dispatch(actionAuthError("Error Desconocido "));
  });
}