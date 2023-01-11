import { Student } from "../models/student.js";
import tryCatch from "../middleware/tryCatch.js";
import Error from "../utils/error.js"

export const createStudent = tryCatch(async (req,res,next)=>{
    let data = req.body
    let {Id,Name,Age,Mark1,Mark2,Mark3} = data

    let fields = ["Id","Name","Age","Mark1","Mark2","Mark3"]
    for(let field of fields){
      if (!data[field]) {
        return next(new Error(`Please provide ${field} field`, 400));
      }
    }

    if (!Id.match(/^[0-9]*$/)) {
        return next(new Error(`Id only contain number`, 400));
      }
      const uniqueId = await Student.findOne({ Id });
      if (uniqueId) {
        return next(new Error(`This Id is already registered`, 400));
      }

    if (!Name.match(/^[a-zA-Z]{2,20}$/)) {
        return next(new Error(`Name only contain number`, 400));
      }
      if (!Age.match(/^\d+$/)) {
        return next(new Error(`Age only contain number`, 400));
      }
      if (!Mark1.match(/^\d+$/)) {
        return next(new Error(`Mark1 only contain number`, 400));
      }
      if (!Mark2.match(/^\d+$/)) {
        return next(new Error(`Mark2 only contain number`, 400));
      }
      if (!Mark3.match(/^\d+$/)) {
        return next(new Error(`Mark3 only contain number`, 400));
      }
    
      if(Mark1 >= 35 && Mark2 >= 35 && Mark3 >= 35){
            data.resultStatus = "passed"
      }else{
            data.resultStatus= "failed"
      }

      const saveData = await Student.create(data);

      res.status(201).send({success:true,data:saveData})

})

export const getStudent = tryCatch(async (req,res,next)=>{
   const {Id} = req.params

   const student = await Student.findOne({Id})
   if(!student){
    return next(new Error("student not found",400))
   }

   res.status(200).send({status:true,data:student})

})

export const result = tryCatch(async (req,res,next)=>{
    const {resultStatus} = req.query

    if (resultStatus != "passed" && resultStatus != "failed") {
      return next(new Error(`resultStatus should be passed or failed`, 400));
    }

    const data = await Student.find({resultStatus})

    if(!data){
      return next(new Error(`student not found`, 404));
    }

    res.status(200).send({status:true,"total students":data.length,data:data})
})