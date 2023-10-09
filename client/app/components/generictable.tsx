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
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function GenericTable(props: any) {
  const t = useTranslations("Account");

  const router = useRouter();

  const { formData, selectedOption } = props;

  const tableHeadings =
    selectedOption === "SALES"
      ? [t("tableHeadingConsultant"), t("tableHeadingDate"), ""]
      : [t("tableHeadingCompany"), t("tableHeadingDate"), ""];

  const handleOpenClick = (event: any, formId: number) => {
    // Prevent the default behavior of the link
    event.preventDefault();

    // Navigate to the form details page with the selected form's ID

    router.replace(`account/formdetails?id=${formId}`);
  };

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow hover >
            {tableHeadings.map((heading: string, index: number) => (
              <TableCell key={index}>{heading}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {formData.map((form: any, innerIndex: number) => (
            <TableRow key={innerIndex} onClick={(event) => handleOpenClick(event, form.id)}>
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
                  {t("tableOpenButton")}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer >
  );
}
