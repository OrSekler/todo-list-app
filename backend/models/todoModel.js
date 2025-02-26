import mongoose  from "mongoose";

const prioritys = [
	"High",
	"Medium",
	"Low",
];


const todoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Task title is required"],
    },
    description:{
        type: String,
        required: [true, "Task description is required"],
    },
    priority: {
		type: String,
		enum: {
			values: Object.values(prioritys),
			message: "Invalid task priority",
		},
	},
    dueDate: {
		type: Date,
		required: true,
		default: Date.now,
	},
    completed: {
		type: Boolean,
		required: true,
		default: false,
	},
});

const ToDo = mongoose.model('ToDo', todoSchema);

export default ToDo;