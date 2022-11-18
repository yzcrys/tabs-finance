import React, { useState } from 'react';
import {  View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';




import {MyHeader, DescBoxData, styles, DoubleDescBox, FloatingActionButton, InventoryCategory} from '../../fragments/view'
import TaskListComponent from '../../fragments/view/tasks/TaskListComponent';
import { TaskListFolder } from '../../fragments/view/tasks/TaskListFolder';
import AddTaskComponent from '../../fragments/view/tasks/AddTaskView';
import DropDownPicker from 'react-native-dropdown-picker';
import AddTaskAdminComponent from '../../fragments/view/tasks/AddTaskAdminView';
import HeaderComponent from '../../fragments/view/common/HeaderComponent';


















//initializing data to pass into this page's components

const dbd1 = new DescBoxData("none", "1", "Assigned");
const dbd2 = new DescBoxData("none", "1", "Completed");
const data2 = [dbd1, dbd2];




/*OLD CODE THAT I DO NOT WANT TO DELETE SO THAT I CAN COPY IT LATER

// const SIGN_UP = gql`
// mutation signUp($email: String!, $password: String!) {
//   signUp(email: $email, password: $password){
//     email
//   }
// }
// `



END BLOCK OF OLD CODE */


/**
* @name FullViewTasksAdminPage
* @returns Component holding the entire view tasks admin page. Swaps between different sections depending on actions taken.
*/
const FullViewTasksAdminPage = () => {
 
  const [viewPortId, setViewPortId] = useState(0)
  return(
    <View>

    {viewPortId == 0 && <ViewTasksAdminPage houseId='testHouse' userId='testUser' setViewportId={setViewPortId}/>}
    {viewPortId == 1 && <AddTaskAdminComponent houseId='testHouse' userId='testUser' setViewPortId={setViewPortId}/>}
    </View>
  )

}



/**
* @name ViewTasksPage
* @param userId id of current user
* @param houseId id of user's house
* @param setViewPortId function to swap which view parent renders
* @returns Component to display every roommate's current taks, both completed and in progress.
*/
const ViewTasksAdminPage = ({houseId, userId, setViewportId} : {houseId:string, userId:string, setViewportId: Function})=>{


    console.log("house ID is:" + houseId);
    const ADD_TASK_VIEWPORT_ID = 1;

  //HOOKS
  
    const [roommateId, setRoommateId] = useState("me");
    const [roommateDropDownOpen, setRoommateDropDownOpen] = useState(false);

    const roommateIds=["me", "testUser"]



  




  
 

 
  



  console.log("all hooks passed in code");

    //END HOOKS

  //query handlers


  

  
  //end query handlers
  console.log("all handlers passed in code");




 

 
  console.log("the above should never be null");

  // console.log("LOOK AT QUERY CAT LIST")
  // console.log(JSON.stringify(queryCatList));
 

 


    

    
 

    //console.log(":C:C");




  const backButton = () => {

  }



  




  console.log("what even")
  
  


  









return(
      //the background is a gradient so...
      <LinearGradient colors={["#FFFFFF", "#85C4CF", "#127589" ]} style={styles.page} start={[0, 0]} end={[1, 1]} locations={[0.05, 0.1, 1]}>
        <HeaderComponent screenName={"Tasks"}></HeaderComponent>
        {/* <MyHeader backFunction={{myFunction:()=>{}, name:"unset", argument:null}} title={"Tasks"}/>{// the title of the page plus the back button, could make this more modular but lazy
        } */}
        <View style={styles.flexPage}>{// container for rest of page...
        }


            {//Boxes of information with own gradient bg, made it a duple cuz i saw on a couple pages there were 2 shown in
            //the same row at once
          }


        <DropDownPicker style={{width: "80%", marginVertical:"4%", alignSelf: 'center'}}
        open={roommateDropDownOpen}
        value={roommateId}
        items={roommateIds.map((value:string)=>{return {"label":value, "value":value}})}
        setOpen={setRoommateDropDownOpen}
        setValue={setRoommateId}
       

        theme="DARK"
        multiple={false}
      />

            <TaskListFolder userId={roommateId} houseId={houseId} swipeFunction={(bool:boolean) => {console.log("swiper no swiping")}}/>

            <FloatingActionButton myFunction= {setViewportId} argument= {ADD_TASK_VIEWPORT_ID} name="Add Task"/>
 
           
           
          
          

        </View>
      </LinearGradient>
      
 
)
}








//only export, could make this default but eh...
export default FullViewTasksAdminPage


