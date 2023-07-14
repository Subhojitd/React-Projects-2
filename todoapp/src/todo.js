import React, { Component } from 'react';
import './index.css';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      showModal: false,
      currentTask: null,
      inputValue: ''
    };
  }

  addTask = (event) => {
    event.preventDefault();
  
    if (this.state.inputValue === '') {
      alert('You must enter something');
    } else {
      const newTask = {
        id: Date.now(),
        text: this.state.inputValue,
        status: 'Pending',
        taskNumber: this.state.tasks.length + 1
      };
  
      this.setState((prevState) => ({
        tasks: [...prevState.tasks, newTask],
        inputValue: ''
      }));
    }
  };

  deleteTask = (taskId) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== taskId)
    }));
  };

  openEditModal = (task) => {
    this.setState({
      showModal: true,
      currentTask: task
    });
  };

  closeEditModal = () => {
    this.setState({
      showModal: false
    });
  };

  updateTask = (event) => {
    event.preventDefault();
    const updatedTaskText = event.target.elements['edit-input'].value;

    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === prevState.currentTask?.id
          ? { ...task, text: updatedTaskText }
          : task
      ),
      showModal: false
    }));
  };

  updateStatus = () => {
  const { currentTask, tasks } = this.state;
  if (currentTask) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === currentTask.id) {
        return {
          ...task,
          status: task.status === 'Pending' ? 'Completed' : 'Pending'
        };
      }
      return task;
    });

    this.setState({
      tasks: updatedTasks
    });
  }
};

  


  handleInputChange = (event) => {
    this.setState({
      inputValue: event.target.value
    });
  };

  render() {
    const { tasks, showModal, currentTask, inputValue } = this.state;

    return (
      <header>
        <h1>Todo - App</h1>
        <form id="form" onSubmit={this.addTask}>
          <input
            id="input-box"
            type="text"
            placeholder="Enter your todo"
            value={inputValue}
            onChange={this.handleInputChange}
          />
          <button id="addBtn" type="submit">
            Add 
          </button>
        </form>

        <ul id="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <p><b><i>Task {task.taskNumber} : {task.text}</i></b></p>
            <p className="status">Status: {task.status}</p>
            <div className="btn-container">
              <button
                className="dltBtn"
                onClick={() => this.deleteTask(task.id)}
              >
                Delete
              </button>
              <button className="updateBtn" onClick={this.updateStatus}>
                Update Status
              </button>
              <button
                className="editBtn"
                onClick={() => this.openEditModal(task)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
</ul>


        {showModal && (
          <div id="edit-modal" className="modal">
            <div className="modal-content">
              <h2>Edit Task</h2>
              <form id="edit-form" onSubmit={this.updateTask}>
                <input
                  type="text"
                  id="edit-input"
                  placeholder="Enter updated task"
                  defaultValue={currentTask ? currentTask.text : ''}
                />
                <div className="modal-buttons">
                  <button id="update" type="submit">
                    Update
                  </button>
                  <button
                    type="button"
                    className="close-button"
                    onClick={this.closeEditModal}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </header>
    );
  }
}

export default TodoApp;
