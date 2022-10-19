import { gql, InMemoryCache, useLazyQuery, useQuery } from '@apollo/client';
import React from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar, RefreshControl} from 'react-native';
import HeaderComponent from '../../fragments/view/HeaderComponent';
import { FloatingActionButton } from '../../fragments/view/FloatingActionButton';
import RentListComponent from '../../fragments/view/RentListComponent';
import AddRentPopUpComponent from '../../fragments/view/AddRentPopUpComponent';


const RentAdminScreen: React.FC = () => {

    const [isAddingRent, setIsAddingRent] = React.useState(false);
    const handleAddRent = () =>
        setIsAddingRent(!isAddingRent);
        
    // MOCK data update this with backend connection in future sprint
    return (
        <View style={styles.container}>
            <HeaderComponent screenName='Household Rent'/>

            <SafeAreaView style={styles.scrollContainer}>
                <RentListComponent userId='Seven Abou'/>
            </SafeAreaView>
            
            <FloatingActionButton name="add item" argument={1} myFunction={handleAddRent}/>

            {isAddingRent &&
            <AddRentPopUpComponent isAddingRent={isAddingRent} setIsAddingRent={setIsAddingRent}/>
            }
            
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

export default RentAdminScreen;