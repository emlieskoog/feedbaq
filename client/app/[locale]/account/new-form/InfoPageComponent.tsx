"use client";

import { useEffect, useState, ReactNode } from "react";
import { Box, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "../../../styles/form.css";
import { API_BASE_URL } from "../../../constants";

interface Consultant {
  id: string;
  name: string;
}

interface Salesperson {
  id: string;
  name: string;
}

interface Customer {
  id: string;
  customer_name: string;
}

interface FormValues {
  consultantId: string;
  salesId: string;
  customerId: string;
  createdDate: Date;
}

interface InfoPageComponentProps {
  formValues: FormValues;
  onFormChange: (field: string, value: string) => void;
  t: (key: string) => string;
}

export default function InfoPageComponent({
  formValues,
  onFormChange,
  t,
}: InfoPageComponentProps): ReactNode {
  const { consultantId, salesId, customerId, createdDate } = formValues;

  const handleConsultantChange = (event: any) => {
    onFormChange("consultantId", event.target.value);
  };

  const handleSalesChange = (event: any) => {
    onFormChange("salesId", event.target.value);
  };

  const handleCustomerChange = (event: any) => {
    onFormChange("customerId", event.target.value);
  };

  const handleDateChange = (event: any) => {
    onFormChange("createdDate", event); // assuming event is the new date value
  };

  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [sales, setSales] = useState<Salesperson[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/get-consultants-sales-customers`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setConsultants(data.consultants);
        setSales(data.sales);
        setCustomers(data.customers);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <Box>
      <FormControl required fullWidth margin="normal">
        <InputLabel id="select-label-consultant">{t("consultant")}</InputLabel>
        <Select
          labelId="select-label-consultant"
          fullWidth
          value={consultantId}
          onChange={handleConsultantChange}
        >
          {consultants.map((consultant) => (
            <MenuItem value={consultant.id} key={consultant.id}>
              {consultant.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl required fullWidth margin="normal">
        <InputLabel id="select-label-sales">{t("salesperson")}</InputLabel>
        <Select
          labelId="select-label-sales"
          fullWidth
          value={salesId}
          onChange={handleSalesChange}
        >
          {sales.map((salesperson) => (
            <MenuItem value={salesperson.id} key={salesperson.id}>
              {salesperson.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl required fullWidth margin="normal">
        <InputLabel id="select-label-customer">{t("customer")}</InputLabel>
        <Select
          labelId="select-label-customer"
          fullWidth
          value={customerId}
          onChange={handleCustomerChange}
        >
          {customers.map((customer) => (
            <MenuItem value={customer.id} key={customer.id}>
              {customer.customer_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl required fullWidth margin="normal">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={t("date")}
            value={createdDate}
            format="YYYY-MM-DD"
            onChange={handleDateChange}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  );
}
