const { hash, compare } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require("../config/EnvVars");

class UserService {
  userRepo;

  constructor(repo) {
    this.userRepo = repo;
  }

  async SignUp({ email, password, username }) {
    try {
      password = await hash(password, 10);
      const data = await this.userRepo.CreateUser({
        email,
        password,
        username,
      });

      if (data.success) {
        const user = data.user;
        const payload = {
          email,
          username,
          role: data.role,
          uid: data.data._id,
        };
        const accessToken = await sign(payload, ACCESS_TOKEN_SECRET, {
          expiresIn: "15s",
        });
        const refreshToken = await sign(payload, REFRESH_TOKEN_SECRET, {
          expiresIn: "1d",
        });
        this.userRepo.CreateRefreshToken(refreshToken, data.data._id);
        return {
          success: true,
          uid: data.data._id,
          tokens: { accessToken, refreshToken },
        };
      } else {
        return data;
      }
    } catch (e) {
      console.log("Error at user service layer", e);
      return { success: false, message: "server-error" };
    }
  }

  async SignIn({ authText, password }) {
    try {
      let data;
      if (authText.includes("@"))
        data = await this.userRepo.GetUserWithEmail(authText);
      else data = await this.userRepo.GetUserWithUsername(authText);
      console.log(data);
      if (!data.success) return data;
      const validPassword = await compare(password, data.user.password);
      if (!validPassword)
        return { success: false, message: "Enter the correct email/password" };
      const payload = {
        email: data.user.email,
        username: data.user.username,
        role: data.user.role,
        uid: data.user._id,
      };
      const accessToken = await sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: "15s",
      });
      const refreshToken = await sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
      });
      this.userRepo.CreateRefreshToken(refreshToken, data.user._id);
      return { success: true, user: data.user, accessToken, refreshToken };
    } catch (e) {
      console.log("Error at user service layer", e);
      return { success: false, message: "server-error", error: e };
    }
  }

  async HandleUserLogout(uid, refreshToken) {
    try {
      const data = await this.userRepo.DeleteRefreshToken(uid);
      return data;
    } catch (e) {
      console.log("Error at user service layer", e);
      return { success: false, message: e };
    }
  }

  async GetRefreshToken(uid) {
    try {
      const data = await this.userRepo.GetRefreshTokenWithUID(uid);
      if (data.success)
        return { success: true, refreshToken: data.refreshToken };
      return data;
    } catch (e) {
      console.log("Error at the user Service layer", e);
      return { success: false, message: e };
    }
  }

  async RefreshAccessToken(refreshToken) {
    try {
      const data = await this.userRepo.FindRefreshTokenWithUserDetails(
        refreshToken
      );
      if (data.success) {
        const payload = await verify(refreshToken, REFRESH_TOKEN_SECRET);
        if (payload) {
          if (payload.email !== data.refreshToken.user.email)
            return { success: false, message: "invalid user" };

          //  payload = {payload.email, role: data.role, uid: data.data._id};
          const { email, role, uid } = payload;
          const accessToken = sign({ email, role, uid }, ACCESS_TOKEN_SECRET, {
            expiresIn: "15s",
          });
          return { success: true, accessToken, email, uid, role };
        }
      }
      return data;
    } catch (e) {
      console.log("Error at the user Service layer", e);
      return { success: false, error: e };
    }
  }

  async GetUsersCount() {
    try {
      const data = await this.userRepo.GetUsersCount();
      return data;
    } catch (e) {
      console.log("Error while getting user count", e);
      return { success: false, error: e };
    }
  }

  async GetAllUsers() {
    try {
      const data = await this.userRepo.GetAllUsers();
      return data;
    } catch (e) {
      console.log("Error while getting user count", e);
      return { success: false, error: e };
    }
  }

  async GetUserBasedOnInputText({ text }) {
    try {
      const data = await this.userRepo.GetUserBasedOnInputText({ text });
      return data;
    } catch (e) {
      console.log("Error at User Service Layer", e);
      return { success: false, error: e };
    }
  }

  async GetAllUsersPerformace() {
    try {
      const data = await this.userRepo.GetAllUsersPerformace();
      return data;
    } catch (e) {
      console.log("Error while GetAllUsersPerformace", e);
      return { success: false, error: e };
    }
  }

  async EditUserRole({uid, role}) {
    try{
      const data = await this.userRepo.editUserRole({uid, role});
      return data;
    }catch(e) {
      console.log("Error while editUserRole", e);
      return { success: false, error: e };
    }
  }

  async DeleteUser({uid}) {
    try{
      const data = await this.userRepo.DeleteUser({uid});
      return data;
    }catch(e) {
      console.log("Error while deleteUser", e);
      return { success: false, error: e };
    }
  }
}

module.exports = { UserService };
