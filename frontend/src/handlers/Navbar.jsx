import { Button, Container, Flex, Text, HStack, useColorMode,} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { IoHome } from "react-icons/io5";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Container  maxW={["container.xs", "container.sm", "container.xl"]}>
            <Flex
                h={100}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
					base: "column",
					sm: "row",
				}}                
                width={["container.xs", "container.sm", "container.xl"]}>

                    <Text 
                    fontSize={[ "35", "45", "80" ]}
					fontWeight={"bold"}
					textAlign={"center"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}>
                        ToDo List
                    </Text>

                    <HStack spacing={2} alignItems={"center"}>
                        <Link to={"/"}>
                            <Button title="Home Page">  
                                <IoHome fontSize={25}/>
                            </Button>
                        </Link>
                        <Link to={"/create"}>
                            <Button title="Create Task"> 
                                <PlusSquareIcon fontSize={25}/>
                            </Button>
                        </Link>
                        <Button onClick={toggleColorMode}>
						    {colorMode === "light" ? <IoMoon size='20' title='Dark Mood'/> : <LuSun size='25' title='Light Mood'/>}
					    </Button>
                    </HStack>
            </Flex>
        </Container>
    );
};

export default Navbar;
