import { useDispatch, useSelector } from "react-redux"

import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";
import { loginApi } from "../api";
// import { clearErrorMessage } from "../store/auth/authSlice";
// import loginApi from "../api/loginApi";



export const useAuthStore = () => {

  const {status, user, errorMesage} = useSelector(state => state.auth)
  
  const dispatch = useDispatch();

  const startLogin = async({login, passwd}) => {
      dispatch(onChecking())
      try {
        const { data } = await loginApi.post('/auth/login', {login, passwd});
        localStorage.setItem('token', data.token)
        localStorage.setItem('token-init-date', new Date().getTime());
        dispatch(onLogin({name: data.name, uid: data.uid}))

      } catch (error) {
        dispatch(onLogout('Credenciales incorrectas'));
        setTimeout(() => {
          dispatch(clearErrorMessage())
        }, 10);
      }
  }

  const startRegister = async({name, email, password}) => {
    dispatch(onChecking())
    try {
      const {data} = await loginApi.post('/auth/new',{name, email, password})
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({name: data.name, uid: data.uid}))
    } catch (error) {
        dispatch(onLogout(error.response.data?.msg || '--'))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10);
    }
  }

  const checkAuthToken = async() => {
    const token = localStorage.getItem('token');
    if(!token) return dispatch(onLogout());

    try {
      const {data} =  await loginApi.get('/auth/renew')
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({name: data.name, uid: data.uid}))

    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  }

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
    dispatch(onLogoutCalendar());
  }

  return {

    //* Propiedades
    errorMesage,
    status,
    user,

    //* Metodos
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout
  }
}