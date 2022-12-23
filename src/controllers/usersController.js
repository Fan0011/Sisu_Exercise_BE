import * as dotenv from 'dotenv'
dotenv.config()
import users from '../models/users.js'
import pkg  from 'bcryptjs'
const {hash, compare} = pkg

const LENGTH = process.env.CRYPTO_LENGTH
export default class UsersController {
  constructor() { }

  /**
   * Get Users Function
   * @param req 
   * @param res 
   * @param next 
   */
  welcome = async(req, res, next) => {
    try {
      return res.json('Welcome to our black-cat api')
    } catch (error) {
      apiErrorHandler(error, req, res, 'Remove Following failed.')
    }    
  } 
  signUp = async(req, res, next) => {
    try{
      const {email,  pwd} = req.body
      console.log('body',email,pwd)
      if(email===undefined || pwd===undefined){
        return res.json({success:false, message:null, data:"Confirm your inputs"})
      }
      users.findOne({email:email}).then(async (user)=>{
        if(user){
          return res.json({success:false, message:null, data:"Email already exsits"})
        }else{
          if(!LENGTH){
            return res.json({success:false, message:null, data:"Error in crypting pwd"})
          }else{
            try{
              console.log('pwd',pwd)
              hash(pwd, 10).then(async (cPwd)=>{
                const nUser = new users({email, pwd:cPwd})
                await nUser.save()
                return res.json({"success": true, "message": null, "data": nUser})
              })
            }catch(error){
              return res.json({"success": false, "message": null, "data": "SignUp failed"})
            }            
          }         
        }      
      })      
    } catch(error) {
      return res.json({"success": false, "message": null, "data": "SignUp failed 1"})
    }
  }

  signIn = async(req, res, next) =>{
    try{
      const {email, pwd} = req.body
      users.findOne({email:email}).then(async (user)=>{
        if(!user){
          return res.json({success:false, message:null, data:"Invalid email"})
        }else{
          if(user.pwd){
            compare(pwd, user.pwd).then((r)=>{
              if(r){
                return res.json({"success": true, "message": null, "data": user})
              }else{
                return res.json({"success": false, "message": null, "data": "Wrong password"})
              }
            })
          }else{
            return res.json({"success": true, "message": null, "data": user})
          }        
        }      
      }) 
    }catch(error){
      return res.json({"success": false, "message": null, "data": "SignUp failed"})
    }
  }

  updateProfile = async(req, res, next) => {
    try{
       const {_id,username, description, nickname, email, wallet_adr, role, avatar} = req.body
      users.findById(_id).then((userO)=>{
        if(!userO){
          return res.json({success:false, message:null, data:"Invalid User"})          
        }else{
          users.findOne({email:email}).then((user)=>{
            if(user && email!==userO.email){
              return res.json({success:false, message:null, data:"Email already exist"})          
            }else{
              users.findOne({username:username}).then((user)=>{
                if(user && username!==userO.username){
                  return res.json({success:false, message:null, data:"Username already exist"})          
                } else{
                  users.findByIdAndUpdate(_id,{
                    username,
                    description,
                    nickname,
                    email,
                    wallet_adr,
                    role,
                    avatar
                  }).then((user)=>{
                    if(!user){
                      return res.json({success:false, message:null, data:"Failed update"})
                    }else{
                      return res.json({success:true, message:null, data:user})
                    }
                  })
                }    
              })
            }
          })
        }
      })     
     }catch(error){
      return res.json({"success": false, "message": null, "data": "SignUp failed"})
    }
    

  }
 
}