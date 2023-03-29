const chatRoomsModel = require("../Models/chatRoom");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const ErrorMessage = "Error at ChatRooms Repository Layer";
class ChatRepo {
  async GetChat({ users }) {
    try {
      const messages = await chatRoomsModel
        .findOne({
          users: { $size: 2, $all: users },
        })
        .lean();
      if (messages)
        return {
          success: true,
          data: messages.messages,
          message: "chat found",
        };
      return { success: true, data: [], message: "chat not found" };
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }
  async CreateNewChatRoom({ message, users }) {
    try {
      console.log("message at repo:", message);
      const chat = new chatRoomsModel({ users });
      chat.messages.push(message);
      await chat.save();
      return { success: true, data: chat };
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async AddMessageToChatRoom({ message, users }) {
    try {
      const chat = await chatRoomsModel.findOne({
        users: { $size: 2, $all: users },
      });
      if (chat) {
        chat.messages.push(message);
        await chat.save();
        return { success: true, data: chat };
      }
      console.log("Chat not found while adding message to existing chat", chat);
      return { success: false, data: [], message: "chat not found" };
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async GetUserChats({ uid }) {
    try {
      const chats = await chatRoomsModel.aggregate([
        // Match documents where the users array contains the input user ObjectId
        {
          $match: {
            users: uid,
          },
        },
        // Unwind the users array to create a separate document for each user ObjectId
        {
          $unwind: "$users",
        },
        // Exclude the input user ObjectId from the pipeline
        {
          $match: {
            users: { $ne: uid },
          },
        },
        {
          $addFields: { users: { $toObjectId: "$users" } },
        },
        // Lookup the corresponding user documents and populate the users field
        {
          $lookup: {
            from: "users",
            localField: "users",
            foreignField: "_id",
            as: "users",
          },
        },
        // Exclude the password field from the populated user documents
        {
          $project: {
            users: {
              password: 0,
            },
          },
        },
        // Group the documents back into chat rooms and restore the users array
        // {
        //   $group: {
        //     _id: "$_id",
        //     messages: { $first: "$messages" },
        //     roomType: { $first: "$roomType" },
        //     display: { $first: "$display" },
        //     users: { $push: "$users" },
        //   },
        // },
      ]);
      console.log(chats);
      return { success: true, data: chats };
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }
}

module.exports = { ChatRepo };
