import "./ToDoList.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import ToDoListItem from "./ToDoListItem";
import nothing from './nothing.png'
import add from './add.png'
import close from './close.png'

class ToDoList extends Component {
  state = {
    addFormVisible: false,
    addFormValue: ""
  };

  handleInputChange = event => {
    this.setState({ addFormValue: event.target.value });
  };

  handleFormSubmit = event => {
    const { addFormValue } = this.state;
    const { addToDo } = this.props;
    event.preventDefault();
    addToDo({ title: addFormValue });
    this.setState({ addFormValue: "" });
  };

  renderAddForm = () => {
    const { addFormVisible, addFormValue } = this.state;
    if (addFormVisible) {
      return (
        <div id="todo-add-form" className="col s10 offset-s1">
          <form onSubmit={this.handleFormSubmit}>
            <div className="input-field">
              <input
                value={addFormValue}
                onChange={this.handleInputChange}
                id="toDoNext"
                type="text"
              />
              <label htmlFor="toDoNext">What To Do Next</label>
            </div>
          </form>
        </div>
      );
    }
  };

  renderToDos() {
    const { data } = this.props;
    // console.log(this.props)
    const toDos = _.map(data, (value, key) => {
      return <ToDoListItem key={key} todoId={key} todo={value} />;
    });
    if (!_.isEmpty(toDos)) {
      return toDos;
    }
    return (
      <div className="col s10 offset-s1 center-align">
        <img
          alt="Nothing was found"
          id="nothing-was-found"
          src={nothing}
          width="150"
        />
        <h4>Usted aún no tiene tareas por cumplir</h4>
        <p>Añada una nueva tarea haciendo click en el botón debajo a la derecha</p>
      </div>
    );
  }

  componentWillMount() {
    this.props.fetchToDos();
  }

  render() {
    const { addFormVisible } = this.state;
    return (
      <div className="to-do-list-container">
        <div className="row">
          {this.renderAddForm()}
          {this.renderToDos()}
        </div>
        <div className="fixed-action-btn">
          <button
            onClick={() => this.setState({ addFormVisible: !addFormVisible })}
            className="btn-floating btn-large teal darken-4"
          >
            {addFormVisible ? (
              <img src={close} alt="add task" width="40" style={{ marginTop: '9px'}}/>
            ) : (
              <img src={add} alt="add task" width="40" style={{ marginTop: '9px'}}/>
            )}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(ToDoList);