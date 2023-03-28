const { UserRepository } = require("../database/Repository/users");
const { ChatRepo } = require("../database/Repository/chatRooms");
const userRepo = new UserRepository();
const chatRepo = new ChatRepo();

class ChatService {
  async GetChat({ users }) {
    try {
      const data = chatRepo.GetChat({ users });
      return data;
    } catch (e) {
      console.log("Error At Chat Service Layer", e);
      return { success: false, error: e };
    }
  }
}

const ChatServiceFunc = async (io) => {
  io.on("connection", (socket) => {
    console.log(`user connected: [${socket.id}]`);

    socket.on("userConnect", async (data) => {
      console.log("userConnet", socket.id);
      const userRepoData = await userRepo.AddSocketId({
        uid: data.uid,
        socketId: socket.id,
      });
      if (userRepoData) {
      } else socket.emit("user-connection-failed", { userRepoData });
    });

    socket.on("send-message", async (data) => {
      console.log(data);
      const users = [data.from, data.to];
      const message = {
        messageText: data.messageText,
        dateTime: data.dateTime,
        from: data.from,
        to: data.to,
      };
      console.log("message obj", message);
      const chatRepoData = await chatRepo.GetChat({
        users,
      });
      if (chatRepoData.success) {
        if (chatRepoData.message === "chat not found") {
          const newChatRoomData = await chatRepo.CreateNewChatRoom({
            message,
            users,
          });
          if (newChatRoomData.success) {
            socket.emit("message-send-status", { messageSent: true, message });
          } else {
            socket.emit("message-send-status", { messageSent: false });
          }
        } else {
          const newChatRoomData = await chatRepo.AddMessageToChatRoom({
            message,
            users,
          });
          if (newChatRoomData.success) {
            socket.emit("message-send-status", { messageSent: true, message });
          } else {
            socket.emit("message-send-status", { messageSent: false });
          }
        }
      }
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};

module.exports = { ChatServiceFunc, ChatService };
