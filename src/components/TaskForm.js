import React, { Component } from 'react';
import "./TaskForm.css";

export default class TaskForm extends Component {

  state = {
    title: '',
    description: ''
  }

  newOnSubmit = e => {
    this.props.addTask(this.state.title, this.state.description);
    e.preventDefault();
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return <form className="taskForm" onSubmit={ this.newOnSubmit }>
      <input
        name="title"
        type="text" placeholder="Write  a Task"
        onChange={ this.onChange }
        value={ this.state.title }
      />
      <textarea
        name="description"
        placeholder="wirte a description"
        onChange={ this.onChange }
        value={ this.state.description }
      >
      </textarea>
      <input type="submit" value="Send"/>
    </form>
  }
}
