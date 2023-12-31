import { Modal, Dimensions, StyleSheet, View, Text, Pressable, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { shadowType } from 'react-native-floating-action';
import { TextInput } from 'react-native-gesture-handler';
import { gql, useMutation } from '@apollo/client';

let windowHeight = Dimensions.get('window').height;
let popupHeight = 0.4*windowHeight;

// debtTo and debtFrom should be userId's
const ADD_DEBT =
gql`
mutation AddDebt($debtTo: String!, $debtFrom: String!, $amount: Float!, $description: String!, $dateCreated: String!) {
    addDebt(debtTo:$debtTo, debtFrom:$debtFrom, amount:$amount, description:$description, dateCreated:$dateCreated) {
      debtTo, debtFrom, amount, description, dateCreated
    }
}`

/* Copy paste this where you want to put this modal:

    ***Need this import
    import { useState } from 'react'

    ***This goes before your return statement
    const [modalVisible, setModalVisible] = useState(false);

    const onShowPopup = () => {
      setModalVisible(true)
    }

    const onClosePopup = () => {
      setModalVisible(false)
    }

    *** Put this at the top of the view
    <DebtPopup show = {modalVisible} closePopup = {onClosePopup} />

    *** Example button that shows the popup
    <TouchableOpacity onPress={onShowPopup} style= {{backgroundColor: 'yellow', width: 50, height: 50}}/>
    
*/


/**
* @name AddRemoveButton
* @param closePopup takes in a void function that is used to close the popup
* @returns the two buttons used to either request money or send to
* @see DebtPopup to see where this component is used
*/

const AddRemoveButton = (props: {closePopup : (VoidFunction), userIdInput: string, amountInput: number}) => {

    const [addDebt,  { loading, error }] = useMutation(ADD_DEBT);

    if(loading){
        return  <Text>{'Loading...'} </Text>
    }
    if(error){
        return <Text>{error.message}</Text>
    }

  const onRequestFrom = () => {
    
    // debt to THIS user id (replace 7)
    addDebt({ variables: { debtTo:'7', debtFrom: props.userIdInput, amount: props.amountInput, description: '', dateCreated: (new Date()).toLocaleDateString() } }).catch(error => console.log('error: ', error));
    props.closePopup()
  }

  const onSendTo = () => {
    addDebt({ variables: { debtTo: props.userIdInput, debtFrom: '7', amount: props.amountInput, description: '', dateCreated: (new Date()).toLocaleDateString() } }).catch(error => console.log('error: ', error));
    props.closePopup()
  }

  return(
    <View style = {styles.addRemoveContainer}>
      <TouchableOpacity style = {styles.addRemoveButtons} onPress = {onRequestFrom}>
        <Text style = {styles.buttonTextColor}> Request From </Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.addRemoveButtons} onPress = {onSendTo}>
        <Text style = {styles.buttonTextColor}> Send To </Text>
      </TouchableOpacity>
    </View>
  )
}


/**
* @name DebtPopup
* @param show takes in a boolean in order to define whether or not the popup should show
* @param closePopup takes in a void function that is used to close the popup
* @returns returns a popup that allows users to request or send debts to one another
* @see RentScreen to see where this component is used
*/


const DebtPopup = (props: {show : boolean, closePopup : () => void }) => {
    const [userIdInput, setUserIdInput] = useState('');
    const [amountInput, setAmountInput] = useState(0);

    return (
        <Modal
              animationType="slide"
              transparent={true}
              visible={props.show}
              onRequestClose={() => {
                props.closePopup();
              }}
            >
                <TouchableWithoutFeedback
                  onPress={props.closePopup}
                >
                  <View style={styles.centeredView}>
                    <TouchableOpacity style={styles.modalView} activeOpacity={1}>
                          <Text style={styles.modalText}>User</Text>
                          <TextInput
                            style={styles.transactionInput}
                            keyboardType = 'default'
                            textAlign='center'
                            maxLength={28}
                            onChangeText={newText => setUserIdInput(newText)}
                          />
                          <Text style={styles.modalText}>Amount</Text>
                            <TextInput 
                              style={styles.transactionInput}
                              keyboardType="number-pad"
                              textAlign='center'
                              maxLength={10}
                              onChangeText={newAmount => setAmountInput(Number(newAmount))}
                            />
                          <AddRemoveButton closePopup={props.closePopup} userIdInput={userIdInput} amountInput={amountInput}/>
                      </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
        </Modal>
    )
}

export default DebtPopup;

const styles = StyleSheet.create({
    centeredView: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.75)'
    },
    innerOpacity: {
      height: popupHeight,
      width: '80%',
    },
    modalView: {
      margin: 20,
      paddingTop: 20,
      backgroundColor: "#B8D6DC",
      borderRadius: 20,
      padding: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      height: popupHeight,
      width: '80%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 0,
      textAlign: "left",
      marginRight: "65%"
    },
    addRemoveContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: "2%",
      marginBottom: "5%"
      
    },
    addRemoveButtons: {
      backgroundColor: '#127589',
      length: "10%",
      width: "10%",
      paddingHorizontal: "3%",
      paddingVertical: "5%",
      flex: 1,
      borderRadius: 20,
      marginLeft: "2%",
      marginRight: "2%",
      alignItems: 'center'

    },
    buttonTextColor: {
      color: '#B8D6DC'
    },
    transactionInputContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      marginTop: 0

    },
    transactionInput: {
      backgroundColor: '#E3EFF1',
      marginTop: 0,
      marginBottom: "2%",
      height: '12%',
      width: '90%',
      borderRadius: 20
    }

  });
  