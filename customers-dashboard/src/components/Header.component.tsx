import React from "react";
import { Select, Button, TextInput, useMantineTheme, rem } from "@mantine/core";
import { useModal } from "@/context/ModalContext";
import { IconSearch } from "@tabler/icons-react";
import { IndustryEnum } from "@/core/enums/industry.enum";
import { StatusEnum } from "@/core/enums/custumerStatus.enum";


interface HeaderProps {
  industry: IndustryEnum;
  onStatusChange: (industry: StatusEnum) => void;
  onFilterChange: (industry: IndustryEnum) => void;
  destroyData:()=>void
  searchTerm: string;
  onSearchChange: (term: string) => void;
  status:StatusEnum;

}

 const Header: React.FC<HeaderProps> = ({destroyData,
  searchTerm,
  onSearchChange,
  industry,
  onFilterChange,
  onStatusChange,
  status,
}) => {
  const { openModal } = useModal();
  const theme = useMantineTheme();
  const addCustomer=()=>{
    destroyData()
    openModal()
  }
  return (
    <div className="flex flex-col gap-7">
      <div className="text-lg font-bold flex flex-col items-center ">
        Customer Dashboard
      </div>
      <div className="flex justify-between items-center">
        <TextInput
          radius="xl"
          label="Search by Name"
          miw={450}
          size="md"
          placeholder="Search by customer name"
          width={300}
          value={searchTerm}
          onChange={(event) => onSearchChange(event.currentTarget.value)}
          leftSection={
            <IconSearch
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
        />

        <div className="flex gap-3 items-end ">
      
            <Select
              value={status}
              onChange={(value ) => onStatusChange(value as StatusEnum)}
              data={StatusEnum.items}label="Filter by Status"
            />

            <Select
              value={industry}
              onChange={(value) => onFilterChange(value as IndustryEnum)}
              data={IndustryEnum.items}
              label="Filter by Industry"
            />
        
          <Button onClick={addCustomer}> + New Customer</Button>
        </div>
      </div>
    </div>
  );
};
export default Header;