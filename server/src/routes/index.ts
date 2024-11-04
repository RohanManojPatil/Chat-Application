import {Router} from "express"
import AuthController from "../controller/AuthController.js"
import authMiddleware from "../middlewares/AuthMiddleware.js"
import ChatGroupController from "../controller/ChatGroupController.js"
import ChatGroupUserController from "../controller/ChatGroupUserController.js"
import ChatsController from "../controller/ChatsController.js"
const router = Router()

router.get("/auth/login", AuthController.login)

router.post("/chat-group", authMiddleware, ChatGroupController.store);
router.get("/chat-group", authMiddleware, ChatGroupController.index);
router.get("/chat-group/:id", ChatGroupController.show);
router.put("/chat-group/:id", authMiddleware, ChatGroupController.update);
router.delete("/chat-group/:id", authMiddleware, ChatGroupController.destroy);

router.get("/chat-group-users", ChatGroupUserController.index)
router.post("/chat-group-users",ChatGroupUserController.store)

router.get("/chats/:groupId", ChatsController.index)
export default router