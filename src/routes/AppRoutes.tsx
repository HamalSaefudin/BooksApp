import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  RootStackParamType,
  routesEnum,
} from '@src/constants/rootStackParamType';
import BooksForm from '@src/pages/BooksForm/BooksForm';
import DetailBook from '@src/pages/DetailBook/DetailBook';
import ListBooks from '@src/pages/ListBooks/ListBooks';
import React from 'react';

const Stack = createNativeStackNavigator<RootStackParamType>();

const AppRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName={routesEnum.LIST_BOOKS}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={routesEnum.LIST_BOOKS} component={ListBooks} />
      <Stack.Screen name={routesEnum.DETAIL_BOOK} component={DetailBook} />
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen name={routesEnum.BOOKS_FORM} component={BooksForm} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppRoutes;
