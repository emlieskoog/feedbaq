import React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../styles/landingpage.css';
import { groupBy } from 'lodash';
import GenericTable from "./generictable";

export default function GenericAccordion(props: any) {
    const groupedFollowUps = groupBy(props.qualityFollowUps, props.accordionType);

    return (
        <div>
            {Object.keys(groupedFollowUps).map((item, index) => (
                <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        {item}
                    </AccordionSummary>
                    <AccordionDetails>
                        <GenericTable data={groupedFollowUps[item]} selectedOption={props.selectedOption} />
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}
