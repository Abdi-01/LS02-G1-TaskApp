import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Select
} from '@chakra-ui/react'
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../helper/helper';
import { useEffect } from 'react';
import TaskComponent from '../Components/TaskComponent';

const TodoPage = () => {
    const [taskData, setTaskData] = useState([]);
    const [task, setTask] = useState('')
    const [category, setCategory] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        getAllTask()
    }, [])

    const btnAddTask = async () => {
        try {

            let addTask = await axios.post(API_URL + '/task/add_task', {
                category,
                task
            });

            getAllTask();
            if (addTask.success) {
                setTask('');
                setCategory('');
            }


        } catch (error) {
            console.log(error);
        }
    };

    const getAllTask = async () => {
        try {
            let getTask = await axios.get(API_URL + '/task/all_task');
            setTaskData(getTask.data)
        } catch (error) {

        }
    };

    return (
        <div>
            {/* TSK-3 : Create todo */}
            <div className='h-screen bg-[#1c273b]' >

                <div className='w-3/6 mx-auto'>
                    <div className='py-[50px]'>
                        <h1 className='text-[#d6b78f] text-center text-3xl font-bold'>PERSONAL</h1>
                        <h1 className='text-[#d6b78f] text-center text-3xl font-bold'>TASK MANAGER</h1>
                    </div>

                    <div className='bg-[#354259] rounded-md mb-3'>
                        <div className='flex justify-between p-2 px-4'>
                            <div className='align-middle'>
                                <h1 className='text-[#44a0a0] font-semibold'>{taskData.length} Task</h1>
                            </div>

                            <div className='align-middle'>
                                <button className='bg-[#44a0a0] hover:bg-[#44a0b9] text-white font-bold py-1 px-4 rounded-full' onClick={onOpen}>Add Task</button>
                            </div>

                            <div className='align-middle '>
                                <h1 className='text-[#44a0a0] font-semibold'> Clear Completed</h1>
                            </div>
                        </div>
                    </div>

                    <div>
                        {
                            taskData.map((val, idx) => {
                                return (
                                    <TaskComponent key={idx} task={val} function={getAllTask} />
                                )
                            })
                        }
                    </div>

                    <div className='bg-[#354259] mt-3 rounded-md px-4'>
                        <div className='flex justify-center p-4'>
                            <button className='px-2 font-bold text-[#44a0a0] hover:text-[#ffff]'>To do</button>
                            <button className='px-2 font-bold text-[#44a0a0] hover:text-[#ffff]'> On going</button>
                            <button className='px-2 font-bold text-[#44a0a0] hover:text-[#ffff]'> Completted</button>
                        </div>

                    </div>
                </div>
            </div>



            {/* modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add new Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <input type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={(e) => setTask(e.target.value)} />

                        <Select className='mt-3' value={task} onChange={(e) => setCategory(e.target.value)}>
                            <option value="0" selected>Chose Task</option>
                            <option value="To do">To do</option>
                            <option value="On going">On Going</option>
                            <option value="Completed">Completed</option>
                        </Select>

                    </ModalBody>

                    <ModalFooter>

                        <Button variant='ghost' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='blue' onClick={() => { btnAddTask(); onClose() }}>Submit Task</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default TodoPage;