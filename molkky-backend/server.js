const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const connectDB = require("./config/db");
const matchRoutes = require("./routes/matchRoutes");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST", "PUT"],
	},
});

app.use(cors());
app.use(express.json());
app.use("/api", matchRoutes);

io.on("connection", (socket) => {
	console.log("New client connected");

	socket.on("updateScore", (data) => {
		io.emit("scoreUpdated", data); // Broadcast updates
	});

	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
