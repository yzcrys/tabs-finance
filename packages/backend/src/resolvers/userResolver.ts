import { UserDocument } from '../types'
import {User} from '../models'

const resolvers = {
    Query: {
        me: async(
            root,
            args: {username: String},
            ):
            Promise<UserDocument | null> =>{
                return await User.findById(args).exec()
            }
    },

    Mutation: {
        signUp: async(
            root,
            args: {email: String, username: String, password: String, phone: String}
        ): Promise<UserDocument> =>{

            const user = await User.create(args)
            console.log("Account added to server")
            return user
        },

        signIn: async(
            root,
            args: {username: String, password: String}
        ): Promise<UserDocument> =>{
            const user = await User.findOne({ username: args.username })
            if (user == null) {
                console.log("User not found")
                return null
            } else if (await user.matchesPassword(args.password)) {
                console.log("Password matches")
                return user
            } else {
                console.log("Password does not match")
                return null
            }            
        },

        signOut: async(
            root,
            args: {}
        ): Promise<Boolean> =>{
            console.log("signOut called")
            return true
        }
    }
}

export default resolvers
