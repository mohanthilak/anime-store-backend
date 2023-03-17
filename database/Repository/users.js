const userModel = require("../Models/users");
const refreshTokenModel = require("../Models/refreshToken");

class UserRepository {
  async CreateUser({ email, password, username }) {
    try {
      const user = new userModel({ email, password, username });
      await user.save();
      return { success: true, data: user };
    } catch (e) {
      console.log("Error at user repository:", e);
      if (e.code) return { success: false, message: "email already exists" };
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
      return { success: false, message: "Enter the correct email/password" };
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

  async GetUsersCount() {
    try {
      const count = await userModel.count();
      return { success: true, count };
    } catch (e) {
      console.log("Error while getting total user count", e);
      return { success: false, error: e };
    }
  }
}

module.exports = { UserRepository };
