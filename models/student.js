import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
    Id:{
        type:String,
        unique:true,
        required:true,
        trim:true,
    },
    Name:{
        type:String,
        required:true,
        trim:true
    },
    Age:{
        type:String,
        required:true,
        trim:true
    },
    Mark1:{
        type:String,
        required:true,
        trim:true
    },
    Mark2:{
        type:String,
        required:true,
        trim:true
    },
    Mark3:{
        type:String,
        required:true,
        trim:true
    },
    resultStatus:String

})

export const Student =  mongoose.model("student",studentSchema)