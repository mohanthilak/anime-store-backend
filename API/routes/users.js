const express = require('express');
const router = express.Router();
const {UserService} = require('../../services/users');
const {UserRepository} = require("../../database/Repository/users")
const userRepo = new UserRepository()
const userservice = new UserService(userRepo)

router.post('/signup', async(req, res)=>{
    try{
        const {email, password} = req.body;
        const data = await userservice.SignUp({email, password})
        console.log("DATA:", data)
        if(data.success) return res.status(200).json(data);
        return res.status(200).json(data);
    }catch(e){
        console.log("Error while handling signup request:",e);
        return res.status(500).json({success: false, message:"server-error"})
    }
});

router.post('/signin', async(req,res)=>{
    try{
        const {email, password} = req.body;
        console.log(req.body)
        const data = await userservice.SignIn({email, password})
        if(data.success) return res.status(200).json(data);
        return res.status(200).json(data);
    }catch(e){
        console.log("Error while handlinng signin request", e);
        return res.status(500).json({success: false, message:"server-error", error: e});
    }
})

router.get('/refresh-token/:uid', async (req, res)=>{
    try{
        const {uid} = req.params;
        const data = await userservice.GetRefreshToken(uid);
        if(data.success) return res.status(200).json(data);
        return res.status(404).json(data);
    }catch(e){
        console.log("Error while handling get refresh-token request", e);
        return res.status(500).json({success:false, message: e});   
    }
})

router.post("/logout/:uid", async (req, res) =>{
    try{
        const {refreshToken, accessToken} = req.body;
        const {uid} = req.params;
        const data = await userservice.HandleUserLogout(uid, refreshToken);
        return res.status(200).json(data);
    }catch(e){
        console.log("Error while handling logout request", e);
        return res.status(500).json({success: false, message: e})
    }
})


module.exports = router;