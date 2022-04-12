import React from 'react';
import { AppRouter } from './routers/AppRouter';
//store redux
import { Provider } from 'react-redux';
import { store } from './core/store/store';
//style
import './core/styles/styles.scss';
import { actionLoadConfigTheme } from 'core/store/theme/actions/action';


start();
window.addEventListener('resize', start);

function start(){
  store.dispatch(actionLoadConfigTheme({payload:{width:document.documentElement.clientWidth}}));
}

function App() {


  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
