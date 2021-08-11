import React from 'react';
import { Main } from './pages/main';
import { LoggedInRouter } from './routers/logged-in-router';
import { LoggedOutRouter } from './routers/logged-out-router';


export const App = () => {
  // localStorage.setItem('token', '');
  const token = localStorage.getItem('token');
  return token ? <LoggedInRouter/>:<LoggedOutRouter/>;
}

export default App;

