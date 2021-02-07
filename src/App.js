import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

import './App.css';

// data
import tasks from './fakeData/tasks.json';
// components
import Tasks from "./components/Tasks";
import TaskForm from "./components/TaskForm";


class App extends Component{
  state = {
    tasks,
    apiTasks: []
  }

  addTask = (title, description) => {
    const newTask = {
      title,
      description,
      id: this.state.tasks.length
    }
    this.setState({
      tasks: [...this.state.tasks, newTask]
    });
  }

  deleteTask = (id) => {
    const newTasks = this.state.tasks.filter( task => task.id !== id)
    this.setState({
      tasks: newTasks
    });
  }

  checkDone = id => {
    const newTask = this.state.tasks.map( task => {
      if (task.id === id){
        task.done = !task.done;
      }
      return task;
    });
    this.setState({tasks: newTask});
  }

  deleteApiTasks = (id) => {
    const newTasks = this.state.apiTasks.filter( task => task.id !== id)
    this.setState({
      apiTasks: newTasks
    });
  }

  checkDoneApiTasks = id => {
    const newTask = this.state.apiTasks.map( task => {
      if (task.id === id){
        task.done = !task.done;
      }
      return task;
    });
    this.setState({apiTasks: newTask});
  }

  async componentDidMount() {
    const r = await fetch('https://jsonplaceholder.typicode.com/todos/');
    const data = await r.json();
    const validData = await this.transformToValidTask(data);
    this.setState({apiTasks: validData});
  }

  async transformToValidTask(data) {
    data.map(task => {
      task.done = task.completed;
      task.description = 'Empty description';
      return task
    })
    return data;
  }

  render() {
    return <div>
      <Router>
        <header>
          <nav>
          <NavLink exact to="/" className="navlink">Local Tasks</NavLink>
          <NavLink exact to="/apitasks" className="navlink">API tasks</NavLink>
          </nav>
        </header>
        <Route exact path="/" render={()=> {
          return <div>
            <TaskForm addTask= { this.addTask }/>
            <Tasks 
              tasks={ this.state.tasks }
              deleteTask={ this.deleteTask }
              checkDone={ this.checkDone }
            />
          </div>
        }}>
        </Route>
        <Route exact path="/apitasks" render={()=> {
          return <div>
            <div className="section_title"/>
            <Tasks
              tasks={ this.state.apiTasks }
              deleteTask={ this.deleteApiTasks }
              checkDone={ this.checkDoneApiTasks }
            />
          </div>
        }}>
        </Route>
      </Router>
    </div>
  }
}

//<Route exact path="/posts" component={ Posts }/>

export default App;
