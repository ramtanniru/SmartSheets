require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const dataRoutes = require('./routes/dataRoutes');
const prisma = require('@prisma/client').PrismaClient;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://superjoin-fe.vercel.app", "http://localhost:3000", "http://localhost:3001"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
  transports: ['websocket'],
  allowEIO3: true,
});

app.use(cors({
  origin: ["https://superjoin-fe.vercel.app"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());
app.options('*', cors());

app.use('/', (req, res, next) => {
  req.io = io;
  next();
}, dataRoutes);


io.on('connection', (socket) => {
  console.log('User connected');
});

module.exports = { server, io };
