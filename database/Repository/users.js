const userModel = require("../Models/users");
const refreshTokenModel = require("../Models/refreshToken");

class UserRepository {
    async CreateUser ({email,password}) {
        try{
            const user = new userModel({email, password});
            await user.save();
            return {success: true, data: user};
        }catch(e){
            console.log("Error at user repository:", e);
            if(e.code) return {success: false, message: "email already exists"}
            return {success: false, message: "server-error"};
        }
    }

    async CreateRefreshToken(refreshToken, uid){
        try{
            await refreshTokenModel.create({refreshToken, user_id: uid})
        }catch(e){
            console.log("Error at the user repository:", e);
            return {success: false, message: e}
        }
    }

    async GetUserWithEmail(email){
        try{
            const user = await userModel.findOne({email}).lean();
            console.log(user)
            if(user) return {success: true, user};
            return {success: false, message: "Enter the correct email/password"}
        }catch(e){
            console.log("Error at user Repository layer", e);
            return {success: false, message: "server-error", error:e}
        }
    }

    async DeleteRefreshToken(user_id) {
        try{
            const data = await refreshTokenModel.findOneAndDelete({user_id});
            if(data) return {success: true};
            return {success: false, message: "user_id invalid"};
        }catch(e){
            console.log("Error at user Repository layer", e);
            return {success: false, message: e}
        }
    }

    async GetRefreshTokenWithUID(uid){
        try{
            const refreshToken = await refreshTokenModel.findOne({user_id: uid});
            if(refreshToken) return {success: true, refreshToken: refreshToken.refreshToken};
            return {success: false, refreshToken:null}  
        }catch(e){
            console.log("error at user respository layer:", e);
            return {success: false, message:e};
        }
    }
}

module.exports = {UserRepository}