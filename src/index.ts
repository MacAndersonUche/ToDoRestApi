import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv';


const prisma = new PrismaClient()

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json())

app.use(express.urlencoded({ extended: true }));

//Gets and Returns all lists
app.get('/', async (req: Request, res: Response) => {
    const todo = await prisma.toDo.findMany()
    res.send(todo);
});


//Create a Task 
app.post('/', async (req: Request, res: Response) => {
    const task = await prisma.toDo.create({
        data: { content: req.body.text }
    })
    res.send(task)
});

//Delete a Task
app.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deletedTask = await prisma.toDo.delete({
            where: { id: req.params.id }
        })
        res.send(deletedTask)
    } catch (error) {
        res.send(error)
    }

});
//Update content of a Task
app.patch('/', async (req: Request, res: Response) => {
    try {
        const updatedTask = await prisma.toDo.update({
            where: { id: req.body.id },
            data: { content: req.body.text, isActive: req.body.isActive }
        })
        res.send(updatedTask)
    } catch (error) {
        res.send(error)
    }

});


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});