import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Task.css";

class Task extends Component {

  state = {
    completed: this.props.task.done,
    deleted: false
  }

  styleCompleted() {
    const { task } = this.props;
    if ( this.state.deleted ) return { display: 'none'}
    return {
      color: task.done ? 'gray' : 'black',
      textDecoration: task.done ? 'line-through' : 'none'
    }
  }

  checkDone() {
    /**
     * if you want to render a single component by 
     * changing the 'done' property use this function
     * instead of 'this.props.checkDone.bind(this, task.id)'
     */
    this.props.task.done = !this.props.task.done
    this.setState({completed: this.props.task.done});
  }

  deleteTask = (id) => {
     /**
     * if you want to render a single component when removing it,
     * use this function instead of 'this.props.deleteTask.bind(this, task.id)'
     */
    this.setState({
      deleted: true
    });
  }

  render() {
    const { task } = this.props;
    return <div className="cardTask" style={ this.styleCompleted() }>
      <div className="cardTask-header">
        <h3> { task.id } </h3>
        <input
          type="checkbox"
          onChange={ this.props.checkDone.bind(this, task.id) }
          defaultChecked={ task.done }></input>
      </div>
      <h3> { task.title } </h3>
      <div className="cardTask-body">
        <p className="dont-break-out"> { task.description } </p>
        <div className="cardTask-ctl">
          <button
          className="btnDeleteTask"
          onClick={ this.props.deleteTask.bind(this, task.id) }>x</button>
        </div>
      </div>
    </div>
  }
}

Task.propTypes = {
  task: PropTypes.object.isRequired
}

export default Task;