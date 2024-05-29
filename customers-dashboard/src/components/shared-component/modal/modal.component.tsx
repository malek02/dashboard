import React from 'react';
import { Modal } from '@mantine/core';
import {useModal} from "@/context/ModalContext";


interface ReusableModalProps {
    title: string;
    children: React.ReactNode;
    size:string;
   
}

export const ReusableModal: React.FC<ReusableModalProps> = ({size, title, children }) => {
    const { isOpen, closeModal } = useModal();

    return (
        <Modal opened={isOpen}  onClose={closeModal} size={size} title={title}>
            {children}
        </Modal>
    );
};

