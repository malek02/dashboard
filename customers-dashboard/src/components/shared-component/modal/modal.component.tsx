import React from 'react';
import { Modal } from '@mantine/core';
import {useModal} from "@/context/ModalContext";


interface ReusableModalProps {
    title: string;
    children: React.ReactNode;
   
}

export const ReusableModal: React.FC<ReusableModalProps> = ({ title, children }) => {
    const { isOpen, closeModal } = useModal();

    return (
        <Modal opened={isOpen}  onClose={closeModal} size={"xl"} title={title}>
            {children}
        </Modal>
    );
};

