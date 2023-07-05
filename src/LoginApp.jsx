import { Provider } from 'react-redux'
import './App.css'
import SignIn from './auth/SigIn'
import { store } from './store/store'

export const LoginApp = () => {
  return (
    <div>
      <Provider store={store}>
        <SignIn/>
      </Provider>
    </div>
  )
}
