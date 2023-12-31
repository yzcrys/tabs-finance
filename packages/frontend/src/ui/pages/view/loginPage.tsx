import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native-gesture-handler';
import {gql,useMutation} from '@apollo/client'
import { UserServices } from '../../../controllers/UserServices';
import Loading from '../../fragments/view/loading';

let windowHeight = Dimensions.get('window').height;

export const FullLoginPage = ({navigation}:{navigation:any}) =>{
    const userServices = new UserServices;

    const [loading, setLoading] = useState(true);


    userServices.getCurrentUser().then(value=>{
        setLoading(false);
        console.log("userID is :c: " + value)
        if (value != "" && value != undefined && value != null){
        console.log("BY THE BIG RESULT PART 1\n\n\n\n\n\n");

            navigation.navigate('Home');
        }else{
            return(
                <LoginPage navigation={navigation} userServices={userServices}/>
            )
        }

        if (value == undefined) return <LoginPage navigation={navigation} userServices={userServices}/>
        console.log("BY THE BIG RESULT PART 2\n\n\n\n\n\n");


    })

    if (loading)
    return (<Loading/>)

    else return(
        <LoginPage navigation={navigation} userServices={userServices}/>
    )
}

/**
* @name LoginPage
* @returns a login form with two text inputs, username and password. Also includes a button to navigate to signup and a login button
*/
export const LoginPage = ({navigation, userServices}:{navigation:any, userServices:UserServices}) => {

    const [loggedIn, setLoggedIn] = useState(false);

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const LOGIN = gql`
        mutation SignIn($username: String!, $password: String!) {
            signIn(username: $username, password: $password) {
                id
                email
                username
                password
                phone
            }
        }
    `

    const [LoginMutationFunction, LoginMutationFunctionData] = useMutation(LOGIN);
    const [hasError, setHasError] = useState(false);



    //backend function for login here, constants for username and password stored in username, password
    const onInput = () => {
        setHasError(false)
        if (username == '' || password == '') {
            setHasError(true);
            return;
        }
        LoginMutationFunction({variables: {"username":username, "password":password}}).then(response => {
            if (response == null ||response.data == null || response.data.signIn == null || LoginMutationFunctionData.error) {
            setHasError(true);
        }
        else {
            console.log("strange behaviour\n\n\n\n" + JSON.stringify(response))

            userServices.storeCurrentUser(response.data.signIn.id)
            navigation.navigate('Home');
        }
         }).catch(response => {
            console.log("strange behaviour\n\n\n\n" + JSON.stringify(response))
            setHasError(true);
         });
    }

    //Navigate to the signin page
    const onSwitchToSignIn = () => {
        navigation.navigate('signUpPg');
    }

    return (
        <KeyboardAvoidingView style={stylesheet.mainView} behavior={"height"}>
            <LinearGradient colors={["#FFFFFF", "#85C4CF", "#127589"]} style={stylesheet.gradientStyle} start={[0, 0]} end={[1, 1]} locations={[0.05, 0.1, 1]}>

                <Text style={stylesheet.title}> Welcome to Tabs!  </Text>
                <Text style={stylesheet.sloganText}> Organize your household  </Text>
                <Text style={stylesheet.InputText}> Username </Text>
                <TextInput
                    style={stylesheet.InputTextBox}
                    onChangeText={newText => setUsername(newText)}
                    placeholder=""
                />

                <Text style={stylesheet.InputText}> Password </Text>
                <TextInput 
                    style={stylesheet.InputTextBox}
                    secureTextEntry={true}
                    onChangeText={newText => setPassword(newText)}
                    placeholder=""
                />

                <View style={stylesheet.buttonsContainer}>

                    <TouchableOpacity style={stylesheet.buttonOutline} onPress={onSwitchToSignIn}>
                        <Text style={stylesheet.buttonText}> Sign Up </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={stylesheet.buttonOutline} onPress={onInput}>
                        <Text style={stylesheet.buttonText}> Log In </Text>
                    </TouchableOpacity>
                </View>
                
                <View>
                    {hasError && <Text style={stylesheet.buttonText}>Login failed</Text>}
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}

const stylesheet = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "100%"
    },
    gradientStyle: {
        alignItems: 'center',
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        fontSize: 30,
        color: 'white',
        marginTop: "20%",
        fontWeight: 'bold'
    },
    sloganText: {
        fontSize: 20,
        color: 'white',
        marginTop: "5%",
    },
    keyboardView: {
        width: '100%',
        height: 0.35 * windowHeight,
        backgroundColor: 'blue',
        color: 'yellow',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    InputText: {
        fontSize: 18,
        color: 'white',
        marginTop: "10%",
        marginRight: "60%"
    },
    InputTextBox: {
        fontSize: 18,
        backgroundColor: '#E3EFF1',
        borderRadius: 20,
        width: "85%",
        height: 0.06 * windowHeight,
        marginTop: "2%",
        paddingHorizontal: "5%"
    },
    buttonsContainer: {
        height: "15%",
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-around',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "2%",
    },
    buttonOutline: {
        height: "47%",
        width: '40%',
        backgroundColor: "#034452",
        borderRadius: 20,
        marginHorizontal: "2%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 15,
        color: 'white',
    }
})



// TODO: Change FullInvView to the profile page when it's done


export default FullLoginPage;