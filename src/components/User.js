import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { createUser, editUser, deleteUser } from '../redux';
import ModalWindow from './ModalWindow';
import './styles.css';
import "antd/dist/antd.css";
import { Button, Table, Form, Input, Space } from 'antd';

//Component to show list of users, edit user, delete user, add new user
function User(props) {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [userKeyToEdit, setUserKeyToEdit] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [columns, setColumns] = useState(
        [{
            title: 'Name',
            dataIndex: 'name',
        }, {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={(e) => { onEditUser(record.key, e) }}>Edit</a> |
                    <a onClick={(e) => { onDelete(record.key, e) }}>Delete</a>
                </Space>
            )
        }]);


    const onDelete = (key, e) => {
        e.preventDefault();
        props.deleteUser(key);
    }

    //Function to edit user details
    const onEditUser = (key, e) => {
        e.preventDefault();
        setUserKeyToEdit(key);
        setModalTitle("Edit Existing User");
        showModal();
    }

    //Function to show Modal window
    const showModal = () => {
        setVisible(true);
    }

    //Function to hide Modal window
    const hideModal = () => {
        setVisible(false);
    }

    //Function to handle action to add new user
    const addUser = () => {
        setModalTitle("Add New User");
        showModal();
    }

    //Function to handle modal window Ok/Save action
    const onModalOk = userDetails => {
        if (userDetails) {
            if (!userKeyToEdit) {
                //create new user
                userDetails.key = Math.random();
                props.createUser(userDetails);
            }
            else {
                //edit existing user
                props.editUser(userKeyToEdit, userDetails);
            }
        }
    };

    //User details input form
    let userForm = <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
    >
        <Form.Item
            name="name"
            label="Name"
            rules={[
                {
                    type: 'string',
                    required: true,
                    message: "Please input the name of user!"
                }
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="email"
            label="Email"
            rules={[
                {
                    type: 'email',
                    required: true,
                    message: "Please input the email of user!"
                }
            ]}
        >
            <Input />
        </Form.Item>
    </Form>;


    return (

        <div>
            <Button className="addButton" type="primary" onClick={() => addUser()}>
                Create User
            </Button>
            <ModalWindow
                visible={visible}
                onModalOk={onModalOk}
                hideModal={hideModal}
                title={modalTitle}
                onCancel={() => {
                    setVisible(false);
                }}
                formStructure={userForm}
                form={form}
            />
            <Table
                columns={columns}
                dataSource={props.users}
                pagination={{ defaultCurrent: 1, defaultPageSize: 5 }}
            />
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        users: state.user.userList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (userDetails) => dispatch(createUser(userDetails)),
        editUser: (key, newUserDetails) => dispatch(editUser(key, newUserDetails)),
        deleteUser: (key) => dispatch(deleteUser(key))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
