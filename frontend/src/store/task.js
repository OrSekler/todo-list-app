import {create} from "zustand";

export const useTaskStore = create((set) => ({
    tasks: [],
    setTasks: (tasks) => set({ tasks }),

    createTask: async (newTask) => {
        if (!newTask.title || !newTask.description || !newTask.priority || !newTask.dueDate || !newTask.completed) {
			return { success: false, message: "Please fill in all fields." };
		}
        const res = await fetch("/api/todos", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(newTask)
        })
        const data = await res.json();
        set((state) => ({tasks:[...state.tasks, data.data]}));
        return { success: true, message: "Task created successfully" };
    },

    fetchTasks: async () => {
        const res = await fetch("/api/todos");
        const data = await res.json();
        set({tasks: data.data});
    },

    deleteTask: async (tid) => {
        const res = await fetch(`/api/todos/${tid}`, {method: "DELETE"});
        const data = await res.json();
        if (!data.success) return {success:false, message:data.message};

        set((state) => ({tasks: state.tasks.filter((task) => task._id !== tid)}));
        return {success:true, message:data.message};
    },

    updateTask: async (tid, updatedTask) => {
        const res = await fetch(`/api/todos/${tid}`, {
            method: "PUT",
            headers: {"Content-Type":"application/json",},
            body: JSON.stringify(updatedTask),
        });
        const data = await res.json();
        if (!data.success) return {success:false, message:data.message};
        set((state) => ({
            tasks: state.tasks.map((task) => (task._id === tid ? data.data:task)),
        }));

        return {success:true, message:data.message};
    },
}));