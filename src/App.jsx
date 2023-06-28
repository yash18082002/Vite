import React, { Component } from 'react';
import './App.css';
import { Button, Modal, Form, Input } from 'antd';
import TodoTask from './TodoTask';
import { connect } from 'react-redux';
import { selectAllTodos, fetchTodos, addTodos, selectTodosStatus } from './features/todos/todosSlice';
import { signup, login, selectUsername } from './features/user/userSlice';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      isModalOpen: false
    };
  }

  handleAdd = (values) => {
    const { title, description } = values;
    const todo = {
      title,
      description
    };
    this.props.addTodos(todo);
    //this.setState({ title: '', description: '' });
    this.setState({ isModalOpen: false });
  }

  showModal = () => {
    this.setState({ isModalOpen: true });
  };

  handleCancel = () => {
    this.setState({ isModalOpen: false });
  };

  handleLogin = (e) => {
    e.preventDefault();
    const userLogin = {
      user: {
        username: 'yash',
        password: 'yash1234',
        email: 'yash@email.com'
      }
    };
    this.props.login(userLogin);
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
    const { todos, username } = this.props;
    if(!username) {
      return <p>Login to view todos.</p>
    }

    return (
      <>
        <div className="site-layout-content" style={{ background: '#ffffff' }}>
          {todos.map((todo) => (
            <TodoTask
              title={todo.title}
              _id={todo._id}
              key={todo._id}
              description={todo.description}
              completed={todo.completed}
            />
          ))}
          {username && <Button onClick={this.showModal} type='primary' style={{ margin: '16px' }}>Add Todo</Button>}
          <Modal title="Basic Modal" open={this.state.isModalOpen} onOk={this.handleCancel} onCancel={this.handleCancel}>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              // initialValues={{
              //   remember: true,
              // }}
              onFinish={this.handleAdd}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Please input Todo title!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Please input Todo description!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
        {/* <div className='container my-3'>
          <h1>Todos</h1>
          <form
            action="/todos"
            ref={this.formRef}
            className="needs-validation"
            noValidate
            method="POST"
            onSubmit={this.handleLogin}
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
        </div> */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: selectAllTodos(state),
  todosStatus: selectTodosStatus(state),
  username: selectUsername(state)
});

const mapDispatchToProps = {
  fetchTodos,
  addTodos,
  signup,
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);