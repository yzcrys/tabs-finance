import { DebtDocument } from '../types'
import { Debt, HouseMember } from '../models'
import { Types } from 'mongoose'

async function modifyAmountFunc(debtId:String, amount:Number):Promise<String | Boolean>{
    let x;
    const id = new Types.ObjectId(String(debtId))
    await Debt.findOneAndUpdate({_id:id}, { amount: amount}) .then(()=>{console.log("Debt amount succesfully updated"); x= amount}).catch(()=>{console.log("Failed to modify debt amount"); x= false})
    return x
}

const resolvers = {

    Query: {
        getDebtsTo: async(root,
            args: {debtTo: String}
            ):Promise<DebtDocument[]> => {
            return Debt.find(args);
        },
        getDebtsFrom: async(root,
            args: {debtFrom: String}
            ):Promise<DebtDocument[]> => {
            return Debt.find(args);
        },
        findDebtsRequested: async(root, 
            args
            ):Promise<DebtDocument[]> => {
            return await Debt.find({requestAccepted: null});
        },
        getDebts: async(root,
            args: {debtFrom: String, debtTo: String},
            ):Promise<DebtDocument[]> => {
                return (await Debt.find( { debtTo: args.debtTo } )).concat(await Debt.find( { debtFrom: args.debtFrom } ));
        },
    },

    Mutation: {
        addDebt: async(
            root,
            args: {debtId: String, debtTo: String; debtFrom: String, amount: Number, description: String, dateCreated: String, requestAccepted?: Boolean}
        ): Promise<DebtDocument | Boolean> =>{
            args.requestAccepted = null;

            var debtToName = (await HouseMember.findOne( { userId: args.debtTo } ))["name"];
            var debtFromName = (await HouseMember.findOne( { userId: args.debtFrom } ))["name"];
            
            var newArgs = { debtId: args.debtId,
                debtTo: args.debtTo, 
                debtFrom: args.debtFrom,
                debtToName: debtToName,
                debtFromName: debtFromName,
                amount: args.amount,
                description: args.description,
                dateCreated: args.dateCreated,
                requestAccepted: args.requestAccepted, };
            
            const debt = await Debt.create(newArgs)
            console.log("Successfuly added Debt to server")
            return debt
        },
        acceptRequest: async(root, args:{debtId: String, requestAccepted: Boolean}):Promise<DebtDocument|void> => {
            if (args.requestAccepted != null){
                console.log('fail requestAccepted already set')
            }
            const debt = await Debt.findByIdAndUpdate(args.debtId,{requestAccepted: true}).then((debt) => {debt.requestAccepted = true; return debt}).catch(()=>{console.log("fail to accept req"); return null})
            
            return debt
        },
        rejectRequest: async(root, args:{debtId: String, requestAccepted: Boolean}):Promise<DebtDocument | void> => {
            if (args.requestAccepted != null){
                console.log('fail requestAccepted already set')
            }
            const debt = await Debt.findByIdAndUpdate(args.debtId,{requestAccepted: false}).then((debt)=>{debt.requestAccepted = false; return debt}).catch(()=>{console.log( 'fail to reject req');return null})
            return debt
        },
        undoRequest: async(root, args:{debtId:String, requestAccepted: Boolean}): Promise<DebtDocument | void> =>{
            const debt = await Debt.findByIdAndUpdate(args.debtId,{requestAccepted: null}).then((debt)=>{debt.requestAccepted=null; return debt}).catch(()=>{console.log('fail to undo req')})
            return debt
        },
        modifyAmount: async(root, args: {debtId: String, amount: Number}):Promise<String | Boolean> =>{
           return await modifyAmountFunc(args.debtId, args.amount)
        },
    }
}

export default resolvers