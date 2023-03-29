const userModel = require("../Models/users");
const refreshTokenModel = require("../Models/refreshToken");

class UserRepository {
  async CreateUser({ email, password, username }) {
    try {
      const user = new userModel({ email, password, username, role: "admin" });
      await user.save();
      return { success: true, data: user };
    } catch (e) {
      console.log("Error at user repository:", e);
      if (e.code)
        return { success: false, message: "email/username already exists" };
      return { success: false, message: "server-error" };
    }
  }

  async CreateRefreshToken(refreshToken, uid) {
    try {
      await refreshTokenModel.create({ refreshToken, user_id: uid });
    } catch (e) {
      console.log("Error at the user repository:", e);
      return { success: false, message: e };
    }
  }

  async GetUserWithEmail(email) {
    try {
      const user = await userModel.findOne({ email }).lean();
      console.log(user);
      if (user) return { success: true, user };
      return { success: false, message: "Enter the correct credentials" };
    } catch (e) {
      console.log("Error at user Repository layer", e);
      return { success: false, message: "server-error", error: e };
    }
  }

  async GetUserWithId(id) {
    try {
      const user = await userModel.findById(id).lean();
      return { success: true, data: user };
    } catch (e) {
      console.log("Error at user Repository layer", e);
      return { success: false, message: "server-error", error: e };
    }
  }

  async GetUserWithUsername(username) {
    try {
      const user = await userModel.findOne({ username });
      if (user) return { success: true, user };
      return { success: false, message: "Enter the correct credentials" };
    } catch (e) {
      console.log("Error at user Repository layer", e);
      return { success: false, message: "server-error", error: e };
    }
  }

  async DeleteRefreshToken(user_id) {
    try {
      const data = await refreshTokenModel.findOneAndDelete({ user_id });
      if (data) return { success: true };
      return { success: false, message: "user_id invalid" };
    } catch (e) {
      console.log("Error at user Repository layer", e);
      return { success: false, message: e };
    }
  }

  async FindRefreshTokenWithUserDetails(refreshToken) {
    try {
      const data = await refreshTokenModel.aggregate([
        {
          $match: { refreshToken },
        },
        {
          $addFields: { uid: { $toObjectId: "$user_id" } },
        },
        {
          $lookup: {
            from: "users",
            localField: "uid",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $addFields: { user: { $first: "$user" } },
        },
        {
          $project: {
            uid: 0,
            "user.password": 0,
          },
        },
      ]);
      // console.log("data from aggregate function", data);
      if (data) {
        return { success: true, refreshToken: data[0] };
      }
      return { success: false, message: "Refresh Token Not found" };
    } catch (e) {
      console.log("Error at user Repository layer", e);
      return { success: false, error: e };
    }
  }

  async GetUserBasedOnInputText({ text }) {
    try {
      const data = await userModel.find({
        username: { $regex: text, $options: "i" },
      });
      return { success: true, data };
    } catch (e) {
      console.log("Error at user Repository Layer", e);
      return { success: false, error: e };
    }
  }

  async GetRefreshTokenWithUID(uid) {
    try {
      const refreshToken = await refreshTokenModel.findOne({ user_id: uid });
      if (refreshToken)
        return { success: true, refreshToken: refreshToken.refreshToken };
      return { success: false, refreshToken: null };
    } catch (e) {
      console.log("error at user respository layer:", e);
      return { success: false, message: e };
    }
  }

  async UpdateAttemptedQuiz({ uid, quizID, score }) {
    try {
      const user = await userModel.findById(uid);
      console.log(user);
      let found = false;
      user.attemptedQuiz.forEach((e, i) => {
        if (e.quizID === quizID) {
          user.attemptedQuiz[i].score = score;
          user.attemptedQuiz[i].attempts += 1;
          found = true;
          return;
        }
      });
      if (!found) {
        const attemptedQuiz = {
          quizID: quizID,
          score,
          attempts: 1,
        };
        user.attemptedQuiz.push(attemptedQuiz);
      }
      await user.save();
      return { success: true, user };
    } catch (e) {
      console.log("error at user respository layer:", e);
      return { success: false, message: e };
    }
  }

  async GetAllUsersPerformace() {
    try {
      const users = await userModel.aggregate([
        { $match: {} },
        {
          $unwind: "$attemptedQuiz",
        },
        {
          $addFields: { aid: { $toObjectId: "$attemptedQuiz.quizID" } },
        },
        {
          $lookup: {
            from: "quizzes",
            localField: "aid",
            foreignField: "_id",
            as: "quizDetails",
          },
        },
      ]);
      console.log(users);
      return { success: true, users };
    } catch (e) {
      console.log("error at user respository layer:", e);
      return { success: false, message: e };
    }
  }

  async GetAllUsers() {
    try {
      const users = await userModel.find({});
      return { success: true, users };
    } catch (e) {
      console.log("error while run user Repositoy", e);
      return { success: true, message: e };
    }
  }

  async GetUsersCount() {
    try {
      const count = await userModel.count();
      return { success: true, count };
    } catch (e) {
      console.log("Error while getting total user count", e);
      return { success: false, error: e };
    }
  }

  async AddSocketId({ uid, socketId }) {
    try {
      const user = await userModel.findById(uid).select("-password");
      if (user) {
        user.socketId = socketId;
        user.save();
        return { success: true, data: user };
      } else {
        return { success: false, error: "User not found" };
      }
    } catch (e) {
      console.log("Error in user Repository Layer", e);
      return { success: false, error: e };
    }
  }
  async checkSocketId({ uid }) {
    try {
      const user = await userModel.findById(uid);
      if (user && user.socketId) {
        return { success: true, data: socketId };
      }
      return { success: false, data: null };
    } catch (e) {
      console.log("Error at user Repository Layer", e);
      return { success: false, error: e };
    }
  }
  async deleteSocketId({ socketId }) {
    try {
      const user = await userModel.findOneAndUpdate(
        { socketId },
        { socketId: "" }
      );
      return { success: true, data: user };
    } catch (e) {
      console.log("Error in user Repository Layer", e);
      return { success: false, error: e };
    }
  }
}

module.exports = { UserRepository };
