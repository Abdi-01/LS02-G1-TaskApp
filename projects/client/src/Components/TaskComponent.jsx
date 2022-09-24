import axios from 'axios';
import React from 'react';
import { API_URL } from '../helper/helper';

const TaskComponent = (props) => {

    const updateTask = async (idTask, value) => {
        try {
            let update = await axios.patch(API_URL + '/task/update_task' , {
                idTask,
                newTask : value
            })

            props.function();


        } catch (error) {
            
        }
    }

    return (
        <div>
            <div className='flex justify-between bg-[#354259] rounded-md p-4'>
                <h1 className='font-bold text-[#fff]'>{props.task.task}</h1>
                {
                    props.task.category === 'To do' ?
                        <button className='bg-yellow-500 hover:[#bg-yellow-750]  px-7 py-1 text-[#fff] rounded-md font-bold' onClick={() => updateTask(props.task.idtask, 'On Going')}>{props.task.category}</button>
                        :
                        props.task.category === 'Completed' ?
                            <button className='bg-[#4caf50] px-2 py-1 text-[#fff] rounded-md font-bold' onClick={() => updateTask(props.task.idtask, 'To do')}>{props.task.category}</button>
                            :
                            <button className='bg-purple-500 px-3 py-1 text-[#fff] rounded-md font-bold' onClick={() => updateTask(props.task.idtask, 'Completed')}>{props.task.category}</button>
                }
            </div>
            <hr />
        </div>
    )
}

export default TaskComponent;