"use client";
import React, { useState } from "react";
import { LoadingOverlay, Notification } from "@mantine/core";

import CustomerForm from "@/components/CustomerForm";

import { ModalProvider } from "@/context/ModalContext";
import { CustomerModel } from "@/core/models/customer.model";

import { CustomerTable } from "@/components/shared-component/table/CustomerTable";
import { ReusableModal } from "@/components/shared-component/modal/modal.component";
import Header from "@/components/Header.component";
import { IndustryEnum } from "@/core/enums/industry.enum";
import { StatusEnum } from "@/core/enums/custumerStatus.enum";
import { useFetchCustomers } from "@/components/customHooks/useFetchCustomers";

const Dashboard: React.FC = () => {
 
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerModel>(
    {} as CustomerModel
  );
  const [filter, setFilter] = useState<IndustryEnum>(IndustryEnum.All);
  const [status, setStatus] = useState<StatusEnum>(StatusEnum.All);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { loading,setFilteredCustomers,filteredCustomers, setCustomers, customers, error } =
    useFetchCustomers();

  const handleSaveCustomer = (customer: CustomerModel) => {
    setCustomers((prev) => {
      const existingCustomer = prev.find(
        (c) => c.costumerId === customer.costumerId
      );
      if (existingCustomer) {
        return prev.map((c) =>
          c.costumerId == customer.costumerId ? customer : c
        );
      } else {
        return [customer, ...prev];
      }
    });

    setFilteredCustomers((prev) => {
      const existingCustomer = prev.find(
        (c) => c.costumerId === customer.costumerId
      );
      if (existingCustomer) {
        return prev.map((c) =>
          c.costumerId === customer.costumerId ? customer : c
        );
      } else {
        if (
          filter === "All" ||
          customer.industry === filter ||
          customer.costumerStatus
        ) {
          return [customer, ...prev];
        }
        return prev;
      }
    });

    setSelectedCustomer({} as CustomerModel);
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomers((prev) =>
      prev.filter((customer) => customer.costumerId !== id)
    );
    setFilteredCustomers((prev) =>
      prev.filter((customer) => customer.costumerId !== id)
    );
  };

  const handleFilterChange = (industry: IndustryEnum) => {
    setFilter(industry);
    applyFilterAndSearch(industry, searchTerm, status);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    applyFilterAndSearch(filter, term, status);
  };

  const handelStatusFilter = (status: StatusEnum) => {
    setStatus(status);
    applyFilterAndSearch(filter, searchTerm, status);
  };

  const applyFilterAndSearch = (
    industry: IndustryEnum,
    term: string,
    status: StatusEnum
  ) => {
    let filteredList = customers;
    if (industry !== IndustryEnum.All) {
      filteredList = filteredList.filter(
        (customer) => customer.industry === industry
      );
    }
    if (term) {
      filteredList = filteredList.filter((customer) =>
        customer.companyName.toLowerCase().includes(term.toLowerCase())
      );
    }
    if (status !== StatusEnum.All) {
      filteredList = filteredList.filter(
        (customer) => customer.costumerStatus === status
      );
    }
    setFilteredCustomers(filteredList);
  };

  if (error) return <Notification color="red">{error}</Notification>;

  return (
       <>
        <LoadingOverlay
          visible={loading}
          opacity={0.8}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Header
          industry={filter}
          status={status}
          onFilterChange={handleFilterChange}
          onStatusChange={handelStatusFilter}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          destroyData={() => {
            setSelectedCustomer({} as CustomerModel);
          }}
        />
        <CustomerTable
          customers={filteredCustomers}
          onEdit={(customer) => {
            setSelectedCustomer(customer);
          }}
          onDelete={handleDeleteCustomer}
        />
        <ReusableModal
          title={
            !!selectedCustomer.companyName ? "Edit Customer" : "New Customer"
          }
        >
          <CustomerForm
            customer={selectedCustomer}
            onSave={handleSaveCustomer}
          />
        </ReusableModal>
      </>
  );
};

export default Dashboard;
