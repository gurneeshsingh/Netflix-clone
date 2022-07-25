import React, { useEffect } from 'react';
import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import ProfileScreen from "./components/ProfileScreen";
import { logout, login, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Footer from "./components/Footer";



function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // to check for the current state of user , that is logged in or logged out 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // logged in 
        dispatch(login({
          uid: authUser.uid,
          email: authUser.email,
        }));

      } else {
        // logged out
        dispatch(logout());
      }
    })
    // cleanup 

    return unsubscribe;

  }, [dispatch]);



  return (
    <div className="app">
      <BrowserRouter>

        {!user ?
          <LoginScreen /> :
          <Switch>
            <Route path="/profile">
              <ProfileScreen />
            </Route>
            <Route exact path="/">
              <HomeScreen />
            </Route>
          </Switch>
        }

      </BrowserRouter>
      <Footer />

    </div>
  );
}

export default App;
