import { Container, SimpleGrid, Text, VStack, HStack, Button } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { useTaskStore } from '../store/task';
import TaskCard from '../handlers/TaskCard';

const HomePage = () => {
    const {fetchTasks, tasks} = useTaskStore();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    const sortedTasks = [...tasks].sort((a, b) => {
        // Sort by completion status (Uncompleted first)
        if (a.completed !== b.completed) return a.completed - b.completed;

        // Sort by due date (Soonest first)
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        if (dateA - dateB !== 0) return dateA - dateB;

        // Sort by priority (High > Medium > Low)
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    // Calculate pagination
    const indexOfLastTask = currentPage * itemsPerPage;
    const indexOfFirstTask = indexOfLastTask - itemsPerPage;
    const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);
    const totalPages = Math.ceil(sortedTasks.length / itemsPerPage);

    return (
        <Container maxW="container.xl" mt={10} mr={400}>
            <VStack spacing={8}>
                <SimpleGrid columns={{base:1, md:2, lg:4}} spacingX={60} 
                    spacingY={10} >
                    {currentTasks.map((task) => (
                        <TaskCard key={task._id} task={task} />
                    ))} 
                </SimpleGrid>

                {/* if there are no tasks to present */}
                {tasks.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500' mt={40}>
						No tasks found. Press the + icon at the top of the page to add one.
					</Text>
				)}

                 {/* Pagination Controls */}
                {totalPages > 1 && (
                    <HStack spacing={4}>
                        <Button 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                            isDisabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <Text>Page {currentPage} of {totalPages}</Text>
                        <Button 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                            isDisabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </HStack>
                )}
            </VStack>
        </Container>
    );
};

export default HomePage;
