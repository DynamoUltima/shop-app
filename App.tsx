import { NavigationContainer } from '@react-navigation/native';

import ProductsStackNav from './app/navigation/ProductStack';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, useBottomSheetModal } from '@gorhom/bottom-sheet';
import {  useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomBottomSheetModal from './app/components/customBottomSheetModal';

export default function App() {
  
  const [visible,SetVisible] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  
  const openModal = () => {
    // if(!visible){
    //     // dismiss()
    //     SetVisible(!visible)
    // }

   
      bottomSheetModalRef?.current?.present();
      SetVisible(!visible)
    
  };


  return (
    <GestureHandlerRootView style={{ flex: 1 }} >
      <BottomSheetModalProvider>
        <NavigationContainer>
          <ProductsStackNav onPress={() => openModal()}  visibility={visible}/>
          <CustomBottomSheetModal bottomSheetModalRef={bottomSheetModalRef} />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}




