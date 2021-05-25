import {useContext, useState} from 'react';
import {SnackbarContext} from '../context/SnackbarContext';
import {useDispatch, useSelector} from 'react-redux';
import {login, logout, signup, autoLogin} from '../store/user/actions';
import {fetchCart} from '../store/cart/actions';

export const useAuth = (nav) => {
  const dispatch = useDispatch();
  const snackbar = useContext(SnackbarContext);
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.user);

  const auth = async (email, password, newUser = false) => {
    setLoading(true);
    let authError = '';
    if (newUser) {
      authError = await dispatch(signup(email, password));
      await dispatch(fetchCart());
    } else {
      authError = await dispatch(login(email, password));
      await dispatch(fetchCart());
    }

    if (authError) {
      snackbar.show(authError);
    } else {
      nav.navigate('Shop');
    }
    setLoading(false);
  };

  const autoAuth = async () => {
    setLoading(true);
    await dispatch(autoLogin());
    await dispatch(fetchCart());
    setLoading(false);
  };

  const reverseAuth = async () => {
    let logoutError = '';
    logoutError = await dispatch(logout());
    await dispatch(fetchCart());
    if (logoutError) {
      snackbar.show(logoutError);
    }
  };

  return {auth, autoAuth, reverseAuth, loading, user};
};
