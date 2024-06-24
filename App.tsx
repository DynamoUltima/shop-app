import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ProductsStackNav from './app/navigation/ProductStack';

export default function App() {


  return (
    <NavigationContainer>
      <ProductsStackNav />
      {/* <CustomModal handleSheetChanges={1} /> */}

    </NavigationContainer>
  );
}


