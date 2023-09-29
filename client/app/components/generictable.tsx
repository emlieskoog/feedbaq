import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";

export default function GenericTable(props: any) {
  const { formData, selectedOption } = props;

  const tableHeadings =
    selectedOption === "SALES"
      ? ["Konsult", "Datum", ""]
      : ["Företag", "Datum", ""];

  const handleOpenClick = (event: any, formId: number) => {
    // Prevent the default behavior of the link
    event.preventDefault();

    // Navigate to the form details page with the selected form's ID
    window.location.href = `/account/formdetails?id=${formId}`;
  };

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            {tableHeadings.map((heading: string, index: number) => (
              <TableCell key={index}>{heading}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {formData.map((form: any, innerIndex: number) => (
            <TableRow key={innerIndex} hover>
              {selectedOption === "SALES" ? (
                <>
                  <TableCell>{form.name}</TableCell>
                  <TableCell>{form.date}</TableCell>
                </>
              ) : (
                <>
                  <TableCell>{form.customer_name}</TableCell>
                  <TableCell>{form.date}</TableCell>
                </>
              )}
              <TableCell>
                <Link
                  href="/account/formdetails"
                  onClick={(event) => handleOpenClick(event, form.id)}
                >
                  Öppna
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
