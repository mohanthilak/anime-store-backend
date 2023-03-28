const chatRoomsModel = require("../Models/chatRoom");
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
}

module.exports = { ChatRepo };
