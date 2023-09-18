import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Link from "next/link";

export default function GenericTable(props: any) {
    const { data, selectedOption } = props;

    const tableHeadings = selectedOption === 'salesperson'
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
                    {data.map((followUp: any, innerIndex: number) => (
                        <TableRow key={innerIndex} hover>
                            {selectedOption === "salesperson" ? (
                                <>
                                    <TableCell>{followUp.consultant}</TableCell>
                                    <TableCell>{followUp.date}</TableCell>
                                </>
                            ) : (
                                <>
                                    <TableCell>{followUp.customer}</TableCell>
                                    <TableCell>{followUp.date}</TableCell>
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
