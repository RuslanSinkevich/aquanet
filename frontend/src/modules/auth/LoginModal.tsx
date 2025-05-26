import React from 'react';
import { Modal } from 'antd';
import LoginForm from './LoginForm';

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function LoginModal({ visible, onClose }: LoginModalProps) {
  return (
    <Modal
      title="Вход в систему"
      open={visible}
      footer={null}
      onCancel={onClose}
      destroyOnClose
    >
      <LoginForm onSuccess={onClose} />
    </Modal>
  );
}
