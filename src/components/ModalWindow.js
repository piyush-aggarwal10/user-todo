import React, { useState } from 'react'
import './styles.css';
import { Modal } from 'antd';

//Component to show Modal Window
function ModalWindow({ visible, onCancel, title, onModalOk, formStructure, form, isNewData, hideModal }) {

    const [confirmLoading, setConfirmLoading] = useState(false);

    //Function to handle Save/Ok button click action
    const handleOk = (values) => {
        onModalOk(values);
        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false)
            hideModal();
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
