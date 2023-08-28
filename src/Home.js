import React, { useState, useEffect } from 'react';
import './Styles.css';
import axios from 'axios';
import "./Home.css"
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom'; 

function Home() {
  const navigate = useNavigate(); 
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [updatedTaskData, setUpdatedTaskData] = useState({});
  const [editModes, setEditModes] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn'); // Assuming you set this in Login component

    // If the user is not logged in, redirect to the login page
    if (isLoggedIn !== 'true') {
      navigate('/'); // Redirect to your login page
    } else {
      fetchTasks(); // Fetch tasks if the user is logged in
    }
   
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://task-management-l6a9.onrender.com/api/tasks');
      const fetchedTasks = response.data;
      console.log(fetchedTasks)
      setTasks(fetchedTasks);
      setEditModes(new Array(fetchedTasks.length).fill(false));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async () => {
    try {
      const response = await axios.post('https://task-management-l6a9.onrender.com/api/tasks', {
        title: newTask.title,
        description: newTask.description,
      });

      if (response.status === 201) {
        console.log('Task added successfully.');
        fetchTasks();
      } else {
        console.error('Task creation failed.');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTask = async (taskId, index) => {
    try {
      const response = await axios.put(
        `https://task-management-l6a9.onrender.com/api/tasks/${taskId}`,
        updatedTaskData
      );

      if (response.status === 200) {
        console.log('Task edited successfully.');
        fetchTasks();
        setEditModes((prevModes) => {
          const newModes = [...prevModes];
          newModes[index] = false;
          return newModes;
        });
      } else {
        console.error('Task editing failed.');
      }
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`https://task-management-l6a9.onrender.com/api/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditButtonClick = (index, task) => {
    // Enable edit mode for the specified task
    setEditModes((prevModes) => {
      const newModes = [...prevModes];
      newModes[index] = true;
      return newModes;
    });

    // Initialize updatedTaskData with the current task's data
    setUpdatedTaskData({ ...task });
  };
  const handleTaskCompletion = async (taskId, status) => {
    try {
      // Make an API call to mark the task as completed
      const response = await axios.put(
        `https://task-management-l6a9.onrender.com/api/tasks/${taskId}`,
        { completed: status }
      );
  
      if (response.status === 200) {
        console.log('Task marked as completed successfully.');
  
        // Update the 'completed' status in the local state
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, completed: status } : task
          )
        );
      } else {
        console.error('Task completion failed.');
      }
    } catch (error) {
      console.error('Error marking as completed:', error);
    }
  };
  const handleLogout = () => {
    // Set isLoggedIn to 'false' in localStorage and redirect to the login page
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/');
  };
  

  return (
    <div className='task-container'>
      <h1>Task Manager</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <h2>Add New Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div>
        <h2>Task List</h2>
        <ul>
          {tasks.map((task, index) => (
            <li key={task._id}>
              {editModes[index] ? (
                <div className={(task.completed==false)?"task-completed":"task-incomplete"}>
                  <input
                    type="text"
                    value={updatedTaskData.title}
                    onChange={(e) =>
                      setUpdatedTaskData({ ...updatedTaskData, title: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={updatedTaskData.description}
                    onChange={(e) =>
                      setUpdatedTaskData({ ...updatedTaskData, description: e.target.value })
                    }
                  />
                  <button onClick={() => handleEditTask(task._id, index)}><DoneIcon /></button>
                </div>
              ) : (
                <div>
                  <div className={(task.completed==true)?"task-completed":"task-incomplete"}>
                  <strong>{task.title}</strong> - {task.description}</div><br></br>
                  <div className='button-container'>
                  <button className='edit-button' onClick={() => handleEditButtonClick(index, task)}><EditIcon /></button>
                  <button className='delete-button' onClick={() => handleDeleteTask(task._id)}><DeleteIcon /></button>
                  {(task.completed==false)?<button className='completion-button' onClick={()=> handleTaskCompletion(task._id,true)}>Mark as completed</button>:
                  <button className='completion-button' onClick={()=> handleTaskCompletion(task._id,false)}>Mark as incomplete</button>
                  }
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
