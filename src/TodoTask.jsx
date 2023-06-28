import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTodos, doTodos } from './features/todos/todosSlice';
import { CheckCircleTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Card } from 'antd';

class TodoTask extends Component {
  handleDo = (e) => {
    e.preventDefault();
    this.props.doTodos(this.props);
  }

  handleDelete = (e) => {
    e.preventDefault();
    this.props.deleteTodos(this.props);
  }

  render() {
    const { title, description, completed } = this.props;

    return (
      <>
        {/* <div className="card mx-3 my-3">
          <div className="card-body">
            {`${title}: ${description}`}
            <br />
            {!completed && <button className="btn btn-success mb-3 mx-3 my-3" onClick={this.handleDo}>Do</button>}
            <button className="btn btn-success mb-3 mx-3 my-3" onClick={this.handleDelete}>Delete</button>
          </div>
        </div> */}
        <Card title={title} style={{ margin: '16px', textAlign: 'left' }} extra={<span>{!completed && (<a onClick={this.handleDo}>Do</a>)}{completed && <CheckCircleTwoTone twoToneColor="#90EE90" />} <DeleteTwoTone twoToneColor='#FFCCCB' onClick={this.handleDelete} /></span>}>
          {description}
        </Card>
      </>
    );
  }
}

const mapDispatchToProps = {
  deleteTodos,
  doTodos,
};

export default connect(null, mapDispatchToProps)(TodoTask);