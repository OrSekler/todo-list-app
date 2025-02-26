import { useState } from 'react'
import { Badge, Box, Button, Heading, HStack, IconButton, Input,
	    Modal, ModalBody, ModalCloseButton, ModalContent,
	    ModalFooter, ModalHeader, ModalOverlay, Text, Select,
	    useColorModeValue, useDisclosure, useToast, VStack, } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CheckIcon } from "@chakra-ui/icons";
import { useTaskStore } from '../store/task';

const TaskCard = ({task}) => {
    // Convert `task.dueDate` to a readable "dd-mm-yyyy" format
    const formattedDate = new Date(task.dueDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    // Define badge color based on priority
    const priorityColor = {
        High: "red",
        Medium: "orange",
        Low: "green"
    }[task.priority];

    // Define completed button color and title
    const completedButtonColor = {
        true: "teal",
        false: "gray"
    }[task.completed];
    const completedButtonTitle = {
        true: "Matk task as uncompleted",
        false: "Mark task as completed"
    }[task.completed];

    const textColor = useColorModeValue("gray.800", "gray.100")
    const bg = useColorModeValue("gray.300", "gray.600")

    const [updatedTask, setUpdatedTask] = useState(task);
    const {deleteTask, updateTask} = useTaskStore();
    const toast = useToast();
    const {isOpen, onOpen, onClose} = useDisclosure();

    const handleDeleteTask = async (tid) => {
        const {success,message} = await deleteTask(tid)
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
                description: "Task deleted successfully",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleUpdateTask = async (tid, updatedTask) => {
        const {success,message} = await updateTask(tid, updatedTask);
        onClose();
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
                description: "Task updated successfully",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const toggleCompleted = async () => {
        const updatedTask = { ...task, completed: !task.completed };
        await updateTask(task._id, updatedTask); 
    };

    return (
        <Box shadow='lg' rounded='lg' overflow='hidden' transition='all 0.3s'
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }} mt={10} bg={bg}
        w={["3xs", "2xs", "xs"]} h="auto">
            <Box p={4} mt={'-1.5'}>
                <Heading as={'h3'} size={"md"} mb={2} display="flex" justifyContent="space-between" 
                color={textColor} alignItems="center" fontSize={'2xl'}> 
                    {task.title}
                    <Badge colorScheme={priorityColor} fontWeight={"semibold"}>
                        {task.priority}
                    </Badge>
                </Heading>

                <Text mb={4} color={textColor} fontSize={'md'}>
                    {task.description}
                </Text>

                <HStack spacing={2} justifyContent="space-between" width={"100%"}>                    
                    <Text mb={1} color={textColor} fontSize={"md"}>
                        DueDate: {formattedDate}
                    </Text>
                    <HStack>
                        <IconButton colorScheme={completedButtonColor} isRound={true} size={"sm"}
                        icon={<CheckIcon />} title={completedButtonTitle} onClick={toggleCompleted}/>
                        <IconButton icon={<EditIcon />} colorScheme='blue' size={'sm'} onClick={onOpen}/>
                        <IconButton icon={<DeleteIcon/>} colorScheme='red' size={'sm'} 
                        onClick={() => handleDeleteTask(task._id)}/>
                    </HStack>
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder = 'Titel'
                                name = 'title'
                                type = 'text'
                                value={updatedTask.title}
                                onChange={(e) => setUpdatedTask({...updatedTask, title:e.target.value})}
                            />
                            <Input
                                placeholder = "Description"
                                name = "description"
                                type = 'text'
                                value={updatedTask.description}
                                onChange={(e) => setUpdatedTask({...updatedTask, description:e.target.value})}
                            />
                            <Select placeholder='Priority'
                                name = "priority"
                                type = "text"
                                textFillColor={"GrayText"}
                                value={updatedTask.priority}
                                onChange={(e) => setUpdatedTask({...updatedTask, priority:e.target.value})}
                                >
                                <option value='Low'>Low</option>
                                <option value='Medium'>Medium</option>
                                <option value='High'>High</option>
                            </Select>
                            <Input
                                placeholder = "DueDate"
                                name = "dueDate"
                                type = "date"
                                textFillColor={"GrayText"}
                                min={new Date().toISOString().split("T")[0]}
                                value={updatedTask.dueDate}
                                onChange={(e) => setUpdatedTask({...updatedTask, dueDate:e.target.value})}
                            />
                            <Select placeholder='Completed'
                                name = "completed"
                                type = "text"
                                textFillColor={"GrayText"}
                                value={updatedTask.completed}
                                onChange={(e) => setUpdatedTask({...updatedTask, completed:e.target.value})}
                                >
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                            </Select>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleUpdateTask(task._id, updatedTask)}>
                            Update
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>
    )
}

export default TaskCard
