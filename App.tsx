import { NavigationContainer } from '@react-navigation/native';

import ProductsStackNav from './app/navigation/ProductStack';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { useEffect, useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomBottomSheetModal from './app/components/customBottomSheetModal';

export default function App() {

  const [visible, SetVisible] = useState(Boolean);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openModal = () => {
    // if(visible===true){
    //     SetVisible(false)
    // }else{  
    //    SetVisible(true)}


    bottomSheetModalRef?.current?.present();
    SetVisible(!visible)
    
    

  };

  // useEffect(()=>{},[visible])

  // console.log({'APP':visible})


  return (
    <GestureHandlerRootView style={{ flex: 1 }} >
      <BottomSheetModalProvider>
        <NavigationContainer>
          <ProductsStackNav onPress={()=>openModal()} visibility={visible} bottomSheetModalRef={bottomSheetModalRef} />
          <CustomBottomSheetModal bottomSheetModalRef={bottomSheetModalRef} />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}




