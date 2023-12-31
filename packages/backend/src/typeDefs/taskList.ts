import { gql } from 'apollo-server-express'

//owner is a userid
export default gql`
    extend type Query {
        getTaskList(
            taskListId: String
        ): TaskList
        getTaskListByUser(
            owner: String
        ): [TaskList]
    }

    extend type Mutation {
        addTaskList(
            owner:String
            name: String
            houseId:String
            dateCreated:String
        ):TaskList
        deleteTaskList(
            taskId: String!
        ):Boolean
    }
  
    type TaskList {
        id: ID,
        houseId: String,
        owner: String,
        name: String,
        dateCreated: String,
        done: String
    }
        
`