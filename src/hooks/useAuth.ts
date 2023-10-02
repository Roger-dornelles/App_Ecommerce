import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {useNavigation} from '@react-navigation/native';
import axiosClient from '../axios/config';
import {setTokenAction} from '../store/reducers/signinReducer';

export const useAuth = () => {
  const navigation = useNavigation();
  const {token} = useSelector((state: RootState) => state.signinReducer);
  const dispatch = useDispatch();
  const AuthRoute = (url: string) => {
    try {
      if (token.token) {
        let currentDate = new Date();
        //  exp is in seconds ( invalid token )
        const isTokenValid = token?.exp! * 1000 > currentDate.getTime();

        if (isTokenValid) {
          axiosClient.defaults.headers.common.Authorization = `Bearer ${token.token}`;
          navigation.reset({
            index: 0,
            routes: [{name: url}],
          });
        } else {
          dispatch(
            setTokenAction({
              token: {
                token: undefined,
                exp: 0,
                iat: 0,
              },
            }),
          );

          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'Login'}],
            });
          }, 300);
        }
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      }
    } catch (error) {
      return;
    }
  };

  return {AuthRoute};
};
