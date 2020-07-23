import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { createTodo, editTodo, deleteTodo } from '../redux';
import ModalWindow from './ModalWindow';
import './styles.css';
import { Form, Input, Space, Button, Table, DatePicker } from 'antd';
import "antd/dist/antd.css";

//Component to show list of todos, edit todo, delete todo, add new todo
function Todo(props) {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [todoKeyToEdit, setTodoKeyToEdit] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [columns, setColumns] = useState([
        {
            title: 'Action',
            dataIndex: 'action',
        },
        {
            title: 'DateAdded',
            dataIndex: 'dateAdded',
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={(e) => { onEditTodo(record.key, e) }}>Edit</a> |
                    <a onClick={(e) => { onDelete(record.key, e) }}>Delete</a>
                </Space>
            )
        }
    ]);

    //Function to delete a todo
    const onDelete = (key, e) => {
        e.preventDefault();
        props.deleteTodo(key);
    }

    //Function to edit a todo
    const onEditTodo = (key, e) => {
        setTodoKeyToEdit(key);
        setModalTitle("Edit Existing Todo");
        showModal();
    }

    //Function to hide modal window
    const hideModal = () => {
        setVisible(false);
    }

    //Function to show modal window
    const showModal = () => {
        setVisible(true);
    }

    //Function to handle add todo action
    const addTodo = () => {
        setModalTitle("Add New Todo");
        showModal();
    }

    //Function to handle modal Ok/Save action
    const onModalOk = todoDetails => {
        setVisible(false);

        todoDetails.dateAdded = todoDetails.dateAdded.format('YYYY-MM-DD');
        if (!todoKeyToEdit) {
            //create new todo
            todoDetails.key = Math.random();
            props.createTodo(todoDetails);
        }
        else {
            //edit existing todo
            props.editTodo(todoKeyToEdit, todoDetails);
        }
    };

    //Todo details input form
    let todoForm = <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
            modifier: "public"
        }}
    >
        <Form.Item
            name="action"
            label="Action"
            rules={[
                {
                    type: 'string',
                    required: true,
                    message: "Please input the todo action!"
                }
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="dateAdded"
            label="DateAdded"
            rules={[
                {
                    required: true,
                    message: "Please select a date!"
                }
            ]}
        >
            <DatePicker />
        </Form.Item>
    </Form>;

    return (
        <div>
            <Button className="addButton" type="primary" onClick={() => addTodo()}>
                Add Todo
            </Button><br />
            <ModalWindow
                visible={visible}
                onModalOk={onModalOk}
                hideModal={hideModal}
                title={modalTitle}
                onCancel={() => {
                    setVisible(false);
                }}
                formStructure={todoForm}
                form={form}
            />
            <Table
                columns={columns}
                dataSource={props.todos}
                pagination={{ defaultCurrent: 1, defaultPageSize: 5 }}
            />
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        todos: state.todo.todoList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTodo: (todoDetails) => dispatch(createTodo(todoDetails)),
        editTodo: (key, newTodoDetails) => dispatch(editTodo(key, newTodoDetails)),
        deleteTodo: (key) => dispatch(deleteTodo(key))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)
