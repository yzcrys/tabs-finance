import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Color } from 'react-native-svg';

import RentScreen from './RentScreen';
import FullInvView from './inventoryView';
import DebtScreenView from './DebtScreenView';
import ViewAppliancesView from './ViewAppliancesView';

import { folderCommonStyles } from '../../fragments/view';
import { SvgUri } from 'react-native-svg';
import FullViewTasksAdminPage from './ViewTasksAdminPage';
import FullViewTasksPage from './ViewTasksPage';
import IndividualProfilePageView, { setUserToShow, UserProps } from './IndividualProfilePageView';
import DebtRequestsView from './DebtRequestsView';
import ViewRoommatesScreen from './ViewRoommatesScreen';
import { UserServices } from '../../../controllers/UserServices';
import FullLoginPage from './loginPage';
import { SignUpPage } from './SignUpPage';


const HomePage = ( {navigation}:{navigation:any} ) => {

    const userServices = new UserServices();

    

    return (
        <View style={{
            height: '100%',
            backgroundColor: '#85C4CF'
        }}>
            <TouchableOpacity style = {[
                {
                    padding: 20,
                    position: 'absolute',
                    backgroundColor: '#3fbfb9',
                    right: 0,
                    borderRadius: 20,
                    margin: 20,
                    width: 50,
                    height: 50
                }
            ]}
            onPress={() => {setUserToShow('7', true); navigation.navigate('User Profile')}}
            >
                <SvgUri 
                        uri={"https://cdn.discordapp.com/attachments/852224878185676831/1043107861682724905/Vector.svg"}
                        style ={{
                            width: 50,
                            position: 'absolute',
                            left: 10,
                            top: 10
                        }}
                        viewBox="0 0 140 140"
                        preserveAspectRatio='none'
                    />

            </TouchableOpacity>
            <TouchableOpacity style = {[
                {
                    padding: 20,
                    position: 'absolute',
                    backgroundColor: '#3fbfb9',
                    left: 0,
                    borderRadius: 20,
                    margin: 20,
                    width: 50,
                    height: 50
                }
            ]}
            onPress={() => {userServices.logOutCurrentUser(); navigation.navigate("Log In")}}
            >
                <SvgUri 
                        uri={"https://cdn.discordapp.com/attachments/939188901585752104/1043455245499498536/Logout_veryverybig.svg"}
                        style ={{
                            width: 50,
                            position: 'absolute',
                            left: 10,
                            top: 10
                        }}
                        viewBox="0 0 140 140"
                        preserveAspectRatio='none'
                    />

            </TouchableOpacity>
            <View style={styles.mainView}>
                {/* Title row with folder cutout */}
                <View style = {[folderCommonStyles.row]}>
                    <View style = {[folderBackdropListFragmentStyles.corner]}>

                    </View>
                    <Text style = {[folderBackdropListFragmentStyles.text]}>
                        {"               "}
                    </Text>
                    <View style = {[folderBackdropListFragmentStyles.triangle]}>

                    </View>
                </View>
                <View style={[styles.navigatorStyle]}>
                    <View style = {folderCommonStyles.column}>
                        <View style={[styles.navPanelStyle]}>
                            <TouchableOpacity style={styles.navBoxBack} onPress={() => navigation.navigate('Inventory')}>
                                <View style={{
                                    borderRadius: 1000,
                                    width: "60%",
                                    height: "60%",
                                    top: "20%",
                                    backgroundColor: '#DD6363',
                                }}>
                                    <SvgUri 
                                        uri={"https://cdn.discordapp.com/attachments/852224878185676831/1037974252592312340/Vector_10.svg"}
                                        style ={{
                                            width: '100%',
                                            height: '100%',
                                            top: '30%',
                                            left: '30%'
                                        }}
                                    >
                                        
                                    </SvgUri>
                                </View>
                                <Text style={styles.label}>Food Inventory</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.navBoxBack} onPress={() => navigation.navigate('Rent')}>
                                <View style={{
                                    borderRadius: 1000,
                                    width: "60%",
                                    height: "60%",
                                    top: "20%",
                                    backgroundColor: '#8E7CD8',
                                }}>
                                   <SvgUri 
                                        uri={"https://cdn.discordapp.com/attachments/852224878185676831/1037974222460432394/Vector_9.svg"}
                                        style ={{
                                            width: '100%',
                                            height: '100%',
                                            top: '30%',
                                            left: '38%'
                                        }}
                                    ></SvgUri> 
                                </View>
                                <Text style={styles.label}>Rent</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.navBoxBack} onPress={() => navigation.navigate('ManageDebts')}>
                                <View style={{
                                    borderRadius: 1000,
                                    width: "60%",
                                    height: "60%",
                                    top: "20%",
                                    backgroundColor: '#D4C17A',
                                }}>
                                    <SvgUri 
                                        uri={"https://cdn.discordapp.com/attachments/852224878185676831/1037974195834982451/Vector_8.svg"}
                                        style ={{
                                            width: '100%',
                                            height: '100%',
                                            top: '30%',
                                            left: '30%'
                                        }}
                                    ></SvgUri>
                                </View>
                                <Text style={styles.label}>Manage Debts</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.navPanelStyle}>
                            <TouchableOpacity style={styles.navBoxBack} onPress={() => navigation.navigate('Calendar')}>
                                <View style={{
                                    borderRadius: 1000,
                                    width: "60%",
                                    height: "60%",
                                    top: "20%",
                                    backgroundColor: '#7DBA6E',
                                }}>
                                    <SvgUri 
                                        uri={"https://cdn.discordapp.com/attachments/852224878185676831/1037974124905123860/Vector_6.svg"}
                                        style ={{
                                            width: '100%',
                                            height: '100%',
                                            top: '30%',
                                            left: '30%'
                                        }}
                                    ></SvgUri>
                                </View>
                                <Text style={styles.label}>Tasks</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.navBoxBack} onPress={() => navigation.navigate('Appliances')}>
                                <View style={{
                                    borderRadius: 1000,
                                    width: "60%",
                                    height: "60%",
                                    top: "20%",
                                    backgroundColor: '#34ACBC',
                                }}>
                                    <SvgUri 
                                        uri={"https://cdn.discordapp.com/attachments/939188901585752104/1043006426085343262/applianceIcon.svg"}
                                        style ={{
                                            width: '100%',
                                            height: '100%',
                                            top: '30%',
                                            left: '25%'
                                        }}
                                    ></SvgUri>
                                </View>
                                <Text style={styles.label}>Appliances</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.navBoxBack} onPress={() => navigation.navigate('ViewAllProfiles')}>
                                <View style={{
                                    borderRadius: 1000,
                                    width: "60%",
                                    height: "60%",
                                    top: "20%",
                                    backgroundColor: '#CE7DB8',
                                }}>
                                    <SvgUri 
                                        uri={"https://cdn.discordapp.com/attachments/852224878185676831/1037974162687402034/Vector_7.svg"}
                                        style ={{
                                            width: '100%',
                                            height: '100%',
                                            top: '30%',
                                            left: '30%'
                                        }}
                                    ></SvgUri>
                                </View>
                                <Text style={styles.label}>Roommates</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.navPanelStyle}>
                            <TouchableOpacity style={styles.navBoxBack} onPress={() => navigation.navigate('DebtRequests')}>
                                <View style={{
                                    borderRadius: 1000,
                                    width: "60%",
                                    height: "60%",
                                    top: "20%",
                                    backgroundColor: '#dc8d0c',
                                }}>
                                    <SvgUri 
                                        uri={"https://cdn.discordapp.com/attachments/939188901585752104/1043033793084264458/request.svg"}
                                        style ={{
                                            width: '100%',
                                            height: '100%',
                                            top: '35%',
                                            left: '30%'
                                        }}
                                    ></SvgUri>
                                </View>
                                <Text style={styles.label}>Debt Requests</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </View>
                
            </View>
        </View>
    )
}

const Stack = createNativeStackNavigator();
const userName: UserProps = {user: 'John Smith'}

const Home = () => {




    return (
            <Stack.Navigator initialRouteName='Log In' screenOptions={{headerShown: false}}>
                <Stack.Screen name = 'Home' component = {HomePage}/>
                <Stack.Screen name = 'Inventory' component = {FullInvView} />
                <Stack.Screen name = 'Rent' component = {RentScreen} />
                <Stack.Screen name = 'ManageDebts' component = {DebtScreenView} />
                <Stack.Screen name = 'Calendar' component = {FullViewTasksAdminPage} />
                <Stack.Screen name = 'Appliances' component = {ViewAppliancesView} />
                <Stack.Screen name = 'To Do' component = {FullViewTasksPage} />
                <Stack.Screen name = 'User Profile' component = {IndividualProfilePageView} />
                <Stack.Screen name = 'DebtRequests' component = {DebtRequestsView} />
                <Stack.Screen name = 'ViewAllProfiles' component = {ViewRoommatesScreen} />
                <Stack.Screen name = 'Log In' component = {FullLoginPage} />
                <Stack.Screen name = 'signUpPg' component = {SignUpPage} />

            </Stack.Navigator>
    )


}

const styles = StyleSheet.create({
    mainView: {
        width: "100%",
        backgroundColor: '#85C4CF',
        flexDirection: 'column',
        position: 'absolute',
        bottom: 0,
    },
    navBoxBack: {
        backgroundColor: '#2C2C2C',
        width: '23%',
        aspectRatio: 1, 
        alignItems: 'center',
        borderRadius: 10,
        zIndex: 1,
    },
    folderBack: {
        zIndex: -1,
        height: '100%',
        width: '100%',
        display: 'flex',
        flex: 1,
        bottom: 0,
        left: 0,
        position: 'absolute',
        justifyContent: 'flex-end',
        opacity: 50,
    },
    navPanelStyle: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 20,
    },
    navigatorStyle: {
        justifyContent: 'space-evenly',
        backgroundColor: '#1C4048',
        paddingTop: 30,
        paddingBottom: 70,
    },

    label: {
        color: 'white',
        fontSize: 11,
        fontWeight: '800',
        top: '43%',
    }
})

const folderBackdropListFragmentStyles = StyleSheet.create({
    corner: {
        padding: 20,
        backgroundColor: '#1C4048',
        borderTopLeftRadius: 20
    },

    text: {
        backgroundColor: '#1C4048',
        height: 40,
        paddingTop: 10,
        color: "#1C4048",
        fontSize: 20
    },

    container: {
        borderTopRightRadius: 10,
        backgroundColor: '#1C4048',
        paddingBottom: 40
    },

    triangle: {
        width:30,
        height:40,
        borderRightWidth:40,
        borderRightColor:"transparent",
        borderBottomWidth:40,
        borderBottomColor:'#1C4048'
    }

})

export default Home;
