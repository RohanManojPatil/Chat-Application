import { Server, Socket } from "socket.io";
import prisma from "./config/db.config.js";
import { produceMessage } from "./helper.js";

interface CustomSocket extends Socket{
    room?:string
}
export function setupSocket(io:Server){
    io.use((socket:CustomSocket, next) => {
        const room = socket.handshake.auth.room
        if(!room)
        {
            return next(new Error("Invalid Error"))
        }

        socket.room = room
        next()
    })
    io.on("connection", (socket:CustomSocket) => {
        socket.join(socket.room)
        
        socket.on("message", async(data) => {
            console.log("Server side message", data)
            await produceMessage(process.env.KAFKA_TOPIC, data)
            socket.to(socket.room).emit("message", data)
        });
        socket.on("disconnect", () => {
            console.log("A user disconnected", socket.id)
        })
    })
}