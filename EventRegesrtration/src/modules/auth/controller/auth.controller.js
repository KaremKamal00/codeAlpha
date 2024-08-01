import userModel from "../../../../DB/models/userModel.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import { generateToken } from "../../../utils/generteAndVerfiyToken.js";
import { comparePassword, hashPassword } from "../../../utils/hashAndCompare.js";


export const registerUser=asyncHandler(
    async(req,res,next)=>{
        //1-Take data
        const {name,email,password}=req.body;

        //2-check if email exist
        const emailFound=await userModel.findOne({email})
        if(emailFound){
            return next(new Error("Email Already Exist",{cause:409}) )
        }

        //3-create token
        const token=generateToken({
            payload:{email},
            signature:process.env.SIGNUP_TOKEN_SIGNATURE
            })

        //4-hash password    
        req.body.password=hashPassword({plaintext:req.body.password})    

        //5-create user
        const user=await userModel.create(req.body)
        return res.status(200).json({message:"Done",user})
    }
)



export const login=asyncHandler(
    async(req,res,next)=>{
        //take data
        const {email,password}=req.body

        //email exist
        const emailExist=await userModel.findOne({email})
        if(!emailExist){
            return next(new Error("Email Or Password Incorrect",{cause:400}) )
        }

        //compare password
        const compare=comparePassword({
            plaintext:password,
            hashValue:emailExist.password
        })


        if (!compare){
            return next(new Error("Email Or Password Incorrect",{cause:400}) )
        }

        //generte token
        const token=generateToken({
            payload:{email,id:emailExist._id},
            signature:process.env.TOKEN_SIGNATURE
        })

        return res.status(200).json({message:"done",token})
    }
)
