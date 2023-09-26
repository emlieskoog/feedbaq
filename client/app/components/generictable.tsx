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
                  <TableCell>{form.consultant_name}</TableCell>
                  <TableCell>{form.date}</TableCell>
                </>
              ) : (
                <>
                  <TableCell>{form.customer_name}</TableCell>
                  <TableCell>{form.date}</TableCell>
                </>
              )}
              <TableCell>
                <Link href="/account/formdetails">Öppna</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
