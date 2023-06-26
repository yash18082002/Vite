import React, { Component } from 'react';
import './App.css';
import TodoTask from './TodoTask';
import { connect } from 'react-redux';
import { selectAllTodos, fetchTodos, addTodos, selectTodosStatus } from './features/todos/todosSlice';

class App extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      title: '',
      description: ''
    };
  }

  handleAdd = (e) => {
    e.preventDefault();
    const { title, description } = this.state;
    if (this.formRef.current.checkValidity()) {
      const todo = {
        title,
        description
      };
      this.props.addTodos(todo);
      this.setState({ title: '', description: '' });
    } else {
      e.stopPropagation();
      this.formRef.current.classList.add('was-validated');
    }
  }

  handleTitle = (e) => {
    this.setState({ title: e.target.value });
  }

  handleDescription = (e) => {
    this.setState({ description: e.target.value });
  }

  componentDidMount() {
    if (this.props.todosStatus === 'idle') {
      this.props.fetchTodos();
    }
  }

  render() {
    const { todos } = this.props;

    return (
      <>
        <div className='container my-3'>
          <h1>Todos</h1>
          <form
            action="/todos"
            ref={this.formRef}
            className="needs-validation"
            noValidate
            method="POST"
            onSubmit={this.handleAdd}
          >
            <div className="mb-3">
              <label className="form-label" htmlFor="title">Title</label>
              <input
                className="form-control"
                type="text"
                name="title"
                id="title"
                required
                autoFocus
                value={this.state.title}
                onChange={this.handleTitle}
              />
              <div className="invalid-feedback">Enter title</div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="description">Description</label>
              <input
                className="form-control"
                type="description"
                name="description"
                id="description"
                required
                value={this.state.description}
                onChange={this.handleDescription}
              />
              <div className="invalid-feedback">Enter description</div>
            </div>
            <button className="btn btn-success mb-3">Add</button>
            <br />
          </form>
          {todos.map((todo) => (
            <TodoTask
              title={todo.title}
              _id={todo._id}
              key={todo._id}
              description={todo.description}
              completed={todo.completed}
            />
          ))}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: selectAllTodos(state),
  todosStatus: selectTodosStatus(state),
});

const mapDispatchToProps = {
  fetchTodos,
  addTodos,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);