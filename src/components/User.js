import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { createUser, /*loadUser,*/ editUser, deleteUser } from '../redux';
import ModalWindow from './ModalWindow';
import './styles.css';
import "antd/dist/antd.css";
import { Button, Table, Form, Input, Space } from 'antd';

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
                    <a onClick={(e) => { editUser(record.key, e) }}>Edit</a> |
                    <a onClick={(e) => { onDelete(record.key, e) }}>Delete</a>
                </Space>
            )
        }]);



    const onDelete = (key, e) => {
        e.preventDefault();
        props.deleteUser(key);
    }

    const editUser = (key, e) => {
        // e.preventDefault();
        // props.editUser(key, newUserDetails);
        setUserKeyToEdit(key);
        setModalTitle("Edit Existing User");
        showModal();
    }

    // const onEdit = (values) => {
    //     setVisible(false);
    //     props.editUser(key, userDetails);
    // }



    const showModal = () => {
        setVisible(true);
    }

    const addUser = () => {
        setModalTitle("Add New User");
        showModal();
    }


    const onModalOk = userDetails => {
        console.log("Received values of user from form: ", userDetails);
        setVisible(false);
        //logic for saving user to db
        if (!userKeyToEdit) {
            //create new user
            userDetails.key = Math.random();
            props.createUser(userDetails);
        }
        else {
            //edit existing user
            props.editUser(userKeyToEdit, userDetails);
        }

    };

    let userForm = <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
            modifier: "public"
        }}
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
                title={modalTitle}
                onCancel={() => {
                    setVisible(false);
                }}
                formStructure={userForm}
                form={form}
            />
            <Table
                // rowSelection={rowSelection}
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
