import React, { useState } from 'react';
import cx from 'clsx';
import { Table, Button, ScrollArea, Badge } from '@mantine/core';
import {CustomerModel} from "@/core/models/customer.model";
import {useModal} from "@/context/ModalContext";
import classes from './TableScrollArea.module.css';
import { StatusEnum } from '@/core/enums/custumerStatus.enum';


interface CustomerTableProps {
    customers: CustomerModel[];
    onEdit: (customer: CustomerModel) => void;
    onDelete: (id: string) => void;
}

export const CustomerTable: React.FC<CustomerTableProps> = ({ customers, onEdit, onDelete }) => {
    const { openModal } = useModal();
    const [scrolled, setScrolled] = useState(false);
    const handleEdit = (customer: CustomerModel) => {
        onEdit(customer);
        openModal();
    };
    return (
        <ScrollArea h={650} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Table width={50}>
            <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })} >
            <Table.Tr>
                <Table.Th>Company</Table.Th>
                <Table.Th>Project number</Table.Th>
                <Table.Th>Industry</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
            </Table.Tr>
            </Table.Thead>
            <Table.Tbody  >
            {customers.map((customer) => (
                <Table.Tr key={customer.costumerId}>
                    <Table.Td>{customer.companyName}</Table.Td>
                    <Table.Td>{customer.projects.length}</Table.Td>
                    <Table.Td>{customer.industry}</Table.Td>
                    <Table.Td>{customer.costumerStatus === StatusEnum.Active  ?  <Badge  color="green" variant="light" fullWidth>Active</Badge> : <Badge  color="gray" variant="light" fullWidth>Inactive</Badge>}</Table.Td>
                    <Table.Td className='flex items-center gap-3'>
                        <Button onClick={() => handleEdit(customer)}>Edit</Button>
                        {customer.costumerStatus === StatusEnum.Inactive && <Button onClick={() => onDelete(customer.costumerId)} color="red">Delete</Button>}
                    </Table.Td>
                </Table.Tr>
            ))}
            </Table.Tbody>
        </Table>
        </ScrollArea>
    );
};


