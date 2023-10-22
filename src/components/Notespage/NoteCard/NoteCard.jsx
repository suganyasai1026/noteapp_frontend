import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Input,
  Text,
  Textarea,
  FormLabel,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import "./style.css";
import notebg from "../../../assets/note_bg.png";
import { useDispatch } from "react-redux";
import { deleteNotes, updateNotes } from "../../../Redux/notes/note.actions";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { color } from "framer-motion";
import Swal from "sweetalert2";


export default function NoteCard({ title, body,color, user, _id }) {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [tempTitle, setTitle] = useState(title);
  const [tempBody, setBody] = useState(body);
  const [tempColor, setColor] = useState(color);

  const updateNote =()=>{

    dispatch(updateNotes(_id,{title:tempTitle,body:tempBody,color:tempColor}))
    
    onClose()
    

  }
  const handelDelete=()=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteNotes(_id));
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          
        
        )
      }
    })
    
  }

  return (
    <Card backgroundColor={color}>
      <CardBody>
        <VStack>
          <Heading>{title}</Heading>
          <Text>{body}</Text>

          <Flex gap={2}>
            <>
              <Button onClick={onOpen}>Edit</Button>

              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Edit Note</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <Input
                      value={tempTitle}
                      m
                      placeholder="Please enter title"
                      onChange={(e) => setTitle(e.target.value)}
                    ></Input>
                    <Textarea
                      mt={8}
                      value={tempBody}
                      placeholder={"Please enter description"}
                      onChange={(e) => setBody(e.target.value)}
                    ></Textarea>
                    <FormLabel>Select color</FormLabel>
                    <Input type="color"
                      value={tempColor}
                      m
                      
                      onChange={(e) => setColor(e.target.value)}
                    ></Input>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={updateNote}>
                      Update
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
            <Button
              onClick={handelDelete} 

                
              
            >
              Delete
            </Button>
          </Flex>
        </VStack>
      </CardBody>
    </Card>
  );
}
