import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../pages/HomeScreen';
import ProfileScreen from '../pages/ProfileScreen';
import RequestScreen from '../pages/RequestsScreen';
import SigninScreen from '../pages/SigninScreen';

import Icon from 'react-native-vector-icons/FontAwesome5';

// import Icon from '../components/Icon';

import {
  // NavigationContainer,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import RegisterScreen from '../pages/RegisterScreen';
import Modals from '../components/Modal';
import {RootState} from '../store';
import {useSelector} from 'react-redux';

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
  }

  return <Icon name={iconName} size={24} color={color} />;
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => TabStyled(route, color),
        tabBarActiveTintColor: '#5577fd',
        tabBarInactiveTintColor: 'gray',
      })}
      initialRouteName="Produtos">
      <Tab.Screen name="Perfil" component={ProfileScreen} />
      <Tab.Screen name="Produtos" component={HomeScreen} />
      <Tab.Screen name="Pedidos" component={RequestScreen} />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const {open, message, type} = useSelector(
    (state: RootState) => state.modalReducer,
  );
  return (
    <>
      <Modals type={type} message={message} open={open} />
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={SigninScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={TabNavigation}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default Navigation;
