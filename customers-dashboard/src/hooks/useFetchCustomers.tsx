import { CustomerApi, CustomerModel } from "@/core/models/customer.model";
import { useState, useEffect } from "react";

export const useFetchCustomers = (
  
) => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<CustomerModel[]>([]);
  const [error, setError] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState<CustomerModel[]>(
       []
     );
  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data: CustomerApi[]) => {
        const response = data.map((item) => CustomerModel.mapFromApi(item));
        setCustomers(response);
        setFilteredCustomers(response);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  return { loading,filteredCustomers,setFilteredCustomers, setCustomers, customers, error };
};
