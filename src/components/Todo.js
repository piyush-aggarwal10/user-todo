import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { createTodo, editTodo, deleteTodo } from '../redux';
import ModalWindow from './ModalWindow';
import './styles.css';
import { Form, Input, Space, Button, Table, DatePicker } from 'antd';
import "antd/dist/antd.css";

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
                    <a onClick={(e) => { editTodo(record.key, e) }}>Edit</a> |
                    <a onClick={(e) => { onDelete(record.key, e) }}>Delete</a>
                </Space>
            )
        }
    ]);



    const onDelete = (key, e) => {
        e.preventDefault();
        props.deleteTodo(key);
    }

    const editTodo = (key, e) => {
        setTodoKeyToEdit(key);
        setModalTitle("Edit Existing Todo");
        showModal();
    }

    const showModal = () => {
        setVisible(true);
    }

    const addTodo = () => {
        setModalTitle("Add New Todo");
        showModal();
    }


    const onModalOk = todoDetails => {
        console.log("Received values of todo from form: ", todoDetails);
        setVisible(false);

        todoDetails.dateAdded = todoDetails.dateAdded.format('YYYY-MM-DD HH:mm:ss');
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
                title={modalTitle}
                onCancel={() => {
                    setVisible(false);
                }}
                formStructure={todoForm}
                form={form}
            />
            <Table
                // rowSelection={rowSelection}
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
        // loadTodo: () => dispatch(loadTodo()),
        editTodo: (key, newTodoDetails) => dispatch(editTodo(key, newTodoDetails)),
        deleteTodo: (key) => dispatch(deleteTodo(key))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)
