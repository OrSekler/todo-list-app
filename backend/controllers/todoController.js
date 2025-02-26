import ToDo from "../models/todoModel.js"
import mongoose from "mongoose";


export const getAllTasks = async(req,res) => {
    try{
        const todos = await ToDo.find({});
        res.status(200).json({success:true, data:todos});
    } catch (error) {
        console.log("Error in fetching tasks: ", error.message);
        res.status(500).json({success:false, message:"Server error"});
    }
};

export const getTask = async(req,res) => {
    const {id} = req.params;
    try{
        const currentTodo = await ToDo.findById(id);
        res.status(200).json({success:true, data:currentTodo});
    } catch (error) {
        console.log("Error in fetching task: ", error.message);
        res.status(500).json({success:false, message:"Server error"});
    }
};

export const createTask = async (req, res) => {
    const todo = req.body;

    if (!todo.title || !todo.description || !todo.priority || !todo.dueDate || !todo.completed){
        return res.status(400).json({success:false, message:"Please provide all fields"});
    }

    const newTodo = new ToDo(todo);

    try{
        await newTodo.save();
        res.status(201).json({success:true, data:newTodo});
    } catch(error){
        console.error("Error in creating task: ", error.message);
        res.status(500).json({success:false, message:"Server error"});
    }
};

export const updateTask = async (req,res) => {
    const {id} = req.params;
    const todo = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false, message:"Task not found"});
    }
    try{
        const updatedTask = await ToDo.findByIdAndUpdate(id, todo,{new:true});
        res.status(200).json({success:true,data:updatedTask});
    } catch(error) {
        console.error("Error in updating task: ", error.message);
        res.status(500).json({success:false, message:"Server error"});
    }
};

export const deleteTask = async (req,res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false, message:"Task not found"});
    }
    try{
        await ToDo.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"Task deleted"});
    } catch (error) {
        console.error("Error in deleting task: ", error.message);
        res.status(500).json({success:false, message:"Server error"});
    }
};