import { gql, InMemoryCache, useLazyQuery, useQuery } from '@apollo/client';
import React from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar, RefreshControl} from 'react-native';
import HeaderComponent from '../../fragments/view/common/HeaderComponent';
import OweContainer from '../../fragments/view/debt/OweComponent';
import UpcomingRentComponent from '../../fragments/view/rent/UpcomingRentComponent';
import DebtListComponent from '../../fragments/view/debt/DebtListComponent';
import { FloatingActionButton } from '../../fragments/view/common/FloatingActionButton';
  
// export type Props = {
//     houseId: string;
//     userId: string;
// };

const switchView = () => {
    console.log('pressed add debt, popup');
}

/**
* @name RentScreen
* @returns React component of list of debts related to current user and ther upcoming monthly rent and due date
*/
const RentScreen: React.FC = (
) => {
    // for testing purposes, enter houseId, userId here (ex '777', 'Seven Abou') c:
    // we can also just pass in the properties when using rentscreen
    return (
        <View style={styles.container}>
            <HeaderComponent screenName='Rent & Finance'/>
            <UpcomingRentComponent houseId='777' userId='7'/>

            <SafeAreaView style={styles.scrollContainer}>
                <DebtListComponent userId='7'/>
            </SafeAreaView>
            
            {/* <FloatingActionButton 
            name="add item" 
            argument={1} 
            myFunction={switchView}/> */}

            
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#DCF6FB',
    height: '100%',
    width: '100%',
  },

  scrollContainer: {
    height: '50%',
  }
});

export default RentScreen;