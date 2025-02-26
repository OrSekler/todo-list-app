import { Box, Button, Container, Heading, VStack, Input, Select, useToast } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useTaskStore } from '../store/task';

const CreatePage = () => {
    const [newTask, setNewTask] = useState({
        title:"",
        description:"",
        priority:"",
        dueDate:"",
        completed:"",
    });
    
    const toast = useToast();
    const {createTask} = useTaskStore()

    const handleAddTask = async () => {
        const {success, message} = await createTask(newTask)
        if(!success){
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            setNewTask({title:"", description:"", priority:"", dueDate:"", completed:""})
        }
        
    };

    return (
        <Container maxW={"container.sm"} mt={"10"}>
            <VStack spacing={8}>

                <Heading as={"h1"} textAlign={"center"} size={"xl"}>
                    Create New Task
                </Heading>
                
                <Box w={"full"} rounded={"lg"}>
                    <VStack spacing={4}>
                        <Input
                            placeholder = 'Titel'
                            name = 'title'
                            type = 'text'
                            value = {newTask.title}
                            onChange = {(e) => setNewTask({...newTask, title:e.target.value})} />
                        <Input
                            placeholder = "Description"
                            name = "description"
                            type = 'text'
                            value = {newTask.description} 
                            onChange = {(e) => setNewTask({...newTask, description:e.target.value})}/>
                        <Select placeholder='Priority'
                            name = "priority"
                            type = "text"
                            value = {newTask.priority}
                            color={newTask.priority ? "gray.200" : "GrayText"}
                            onChange = {(e) => setNewTask({...newTask, priority:e.target.value})}>
                            <option value='Low'>Low</option>
                            <option value='Medium'>Medium</option>
                            <option value='High'>High</option>
                        </Select>
                        <Input
                            placeholder = "DueDate"
                            name = "dueDate"
                            type = "date"
                            value = {newTask.dueDate}
                            color={newTask.dueDate ? "gray.200" : "GrayText"}
                            min={new Date().toISOString().split("T")[0]}
                            onChange = {(e) => setNewTask({...newTask, dueDate:e.target.value})}/>
                        <Select placeholder='Completed'
                            name = "completed"
                            type = "text"
                            value = {newTask.completed}
                            color={newTask.completed ? "gray.200" : "GrayText"}
                            onChange = {(e) => setNewTask({...newTask, completed:e.target.value})}
                            >
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </Select>
                        <Button colorScheme='blue' onClick={handleAddTask} w="full">
                            Add Task
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default CreatePage;

