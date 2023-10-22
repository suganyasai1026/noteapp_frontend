import { Box, Flex, FormHelperText, Image, VStack } from "@chakra-ui/react";
import {
    
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/config";
import { getUser } from "../Redux/users/user.actions";

export default function SignupPage(){
  
    const nav = useNavigate()
    const [email,setEmail] =useState("")
    const [password,setPassword] =useState("")
    const [name,setName] =useState("")
    
    
    const handleSignup =async()=>{
          
      if (!name || !email || !password) {
        Swal.fire({
          icon: 'error',
          title: '',
          text: 'Please fill in all the fields.',
        });
        return;
      }
    
      // Validate email format using a regular expression
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(email)) {
        Swal.fire({
          icon: 'error',
          title: '',
          text: 'Please enter a valid email address.',
        });
        return;
      }
  
      if (password.trim() === '' || password.length < 6) {
        Swal.fire({
          icon: 'error',
          title: '',
          text: 'Password must be at least 6 characters long.',
        });
        return;
      }

     try {

        let data = await axios.post(BASE_URL+"/user/register",{
            name,email,password
        })
        let  {message,status} = data.data
        if(status==1){
          Swal.fire({
            icon: 'success',
            title: '',
            text: 'User Sucessfully Registered!',
          })
            nav("/login")
        }else{
          Swal.fire({
            icon: 'error',
            title: '',
            text: 'User already Exist!',
          })
        }
    }
    catch (error) {
      console.error('Error during registration:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred during registration. Please try again later.',
      });
    }
    }

    return <Flex padding={4} w="100%">

        
        <VStack w={"150%"}>

            
        <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.1000', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign up with Notes App</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('gray.500', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
          <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input  value={name} onChange={(e)=>setName(e.target.value)} type="text"/>
              
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input  value={email} onChange={(e)=>setEmail(e.target.value)} type="email" />
              
               
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" />
              
              
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
              </Stack>
              <Button
              onClick={handleSignup}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>

        </VStack>
        
    </Flex>
}