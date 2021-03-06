import React, { useMemo, useState } from 'react';
import LoginForm from '../components/LoginForm';
import logo from '../../../logo-420-x-108.png';
import { ILoginParams } from '../../../models/auth';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { setUserInfo } from '../redux/authReducer';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { ROUTES } from '../../../configs/routes';
import { replace } from 'connected-react-router';
import { getErrorMessageResponse } from '../../../utils';
import { Redirect } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onLogin = React.useCallback(
    async (email : string,password : string) => {
      setErrorMessage('');
      setLoading(true);

      const json = await dispatch(
        fetchThunk(API_PATHS.signIn, 'post', { email: email, password: password }),
      );

      setLoading(false);

      if(json.success === true) {

        Cookies.set(ACCESS_TOKEN_KEY, json.user_cookie, { expires: 7 });
        dispatch(setUserInfo(json?.user));
        dispatch(replace(ROUTES.products));
        return;
      }

      setErrorMessage(getErrorMessageResponse(json));
    },
    [dispatch],
  );
  const isLogin = useMemo(() => Cookies.get(ACCESS_TOKEN_KEY), []);
  
  return (
    <div>
      {isLogin ? (
        <Redirect to={ROUTES.products} />
      ) : (
    <div
      className="container"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <LoginForm onLogin={onLogin} loading={loading} errorMessage={errorMessage}  />
    </div>)}
    </div>
  );
};

export default LoginPage;
