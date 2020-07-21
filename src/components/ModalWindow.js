import React, { useState, useEffect } from 'react'
import './styles.css';
import { Button, Modal, Form, Input, DatePicker } from 'antd';

function ModalWindow({ visible, onCancel, title, onModalOk, formStructure, form, isNewData }) {

    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleOk = (values) => {
        setConfirmLoading(true);
        setTimeout(() => {
            onModalOk(values);
            setConfirmLoading(false)
        }, 2000);
    }

    return (
        <Modal
            visible={visible}
            title={title}
            okText="Save"
            cancelText="Cancel"
            onCancel={onCancel}
            confirmLoading={confirmLoading}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        handleOk(values);
                    })
                    .catch(info => {
                        console.log("Validate Failed:", info);
                    });
            }}
        >
            {formStructure}
        </Modal>
    )
}

export default ModalWindow
