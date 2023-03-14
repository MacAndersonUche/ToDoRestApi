"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const prisma = new client_1.PrismaClient();
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//Gets and Returns all lists
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield prisma.toDo.findMany();
    res.send(todo);
}));
//Create a Task 
app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield prisma.toDo.create({
        data: { content: req.body.text }
    });
    res.send(task);
}));
//Delete a Task
app.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTask = yield prisma.toDo.delete({
            where: { id: req.params.id }
        });
        res.send(deletedTask);
    }
    catch (error) {
        res.send(error);
    }
}));
//Update content of a Task
app.patch('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedTask = yield prisma.toDo.update({
            where: { id: req.body.id },
            data: { content: req.body.text, isActive: req.body.isActive }
        });
        res.send(updatedTask);
    }
    catch (error) {
        res.send(error);
    }
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
