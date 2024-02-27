import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../pages/HomeScreen';
import ProfileScreen from '../pages/ProfileScreen';
import RequestScreen from '../pages/RequestsScreen';
import SigninScreen from '../pages/SigninScreen';
import ConfirmPurchase from '../pages/ConfirmPurchaseScreen';
import RegisterScreen from '../pages/RegisterScreen';
import DisplayOneProductScreen from '../pages/DisplayOneProductScreen';
import NewAddressScreen from '../pages/NewAddressScreen';
import AddressScreen from '../pages/AddressScreen';
import UserPurchase from '../pages/UserPurchase';

import Icon from 'react-native-vector-icons/FontAwesome5';

import {
  // NavigationContainer,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import Modals from '../components/Modal';
import {RootState} from '../store';
import {useDispatch, useSelector} from 'react-redux';

import themes from '../themes/themes';
import {setUserAction} from '../store/reducers/userReducer';
import EditProfileScreen from '../pages/EditProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabStyled = (route: RouteProp<ParamListBase, string>, color: string) => {
  let iconName = '';

  switch (route.name) {
    case 'Perfil':
      iconName = 'user';
      break;

    case 'Pedidos':
      iconName = 'shopping-cart';
      break;

    case 'Produtos':
      iconName = 'home';
      break;

    case 'Login':
      iconName = 'warehouse';
  }

  return <Icon name={iconName} size={24} color={color} />;
};

const TabNavigation = () => {
  const {cart} = useSelector((state: RootState) => state.cartReducer);
  const dispatch = useDispatch();
  const {token} = useSelector((state: RootState) => state.signinReducer);

  useEffect(() => {
    if (!token.token) {
      dispatch(
        setUserAction({
          user: {
            id: 0,
            email: undefined,
            exp: 0,
            iat: 0,
          },
        }),
      );
    }
  }, [dispatch, token.token]);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => TabStyled(route, color),
        tabBarActiveTintColor: '#6785ff',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {fontSize: 13},
      })}
      initialRouteName="Produtos">
      {token.token ? (
        <>
          <Tab.Screen name="Perfil" component={ProfileScreen} />

          <Tab.Screen
            name="Produtos"
            component={HomeScreen}
            options={{
              headerShown: false,
              tabBarLabelStyle: {
                fontSize: 12,
              },
            }}
          />
          <Tab.Screen
            name="Pedidos"
            component={RequestScreen}
            options={{
              tabBarBadge: cart.length,
              tabBarBadgeStyle: {
                backgroundColor: themes.theme.blue_100,
                color: themes.theme.white,
              },
              headerShown: false,
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name={'Login'}
            component={SigninScreen}
            options={{
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Produtos"
            component={HomeScreen}
            options={{
              headerShown: false,
              tabBarLabelStyle: {
                fontSize: 12,
              },
            }}
          />

          <Tab.Screen
            name="Pedidos"
            component={RequestScreen}
            options={{
              tabBarBadge: cart.length,
              tabBarBadgeStyle: {
                backgroundColor: themes.theme.blue_100,
                color: themes.theme.white,
              },
              headerShown: false,
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const {open, message, type} = useSelector(
    (state: RootState) => state.modalReducer,
  );
  const {token} = useSelector((state: RootState) => state.signinReducer);
  return (
    <>
      <Modals type={type} message={message} open={open} />

      <Stack.Navigator>
        {token.token !== undefined ? (
          <>
            <Stack.Screen
              name="Home"
              component={TabNavigation}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Produto"
              component={DisplayOneProductScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Endereço" component={AddressScreen} />
            <Stack.Screen name="Pagamento" component={ConfirmPurchase} />
            <Stack.Screen name="Novo Endereço" component={NewAddressScreen} />
            <Stack.Screen name="Compras" component={UserPurchase} />
            <Stack.Screen name="Editar Perfil" component={EditProfileScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={TabNavigation}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Produto"
              component={DisplayOneProductScreen}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Login"
              component={SigninScreen}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export default Navigation;
