import { Avatar, Button, Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../styles/landingpage.css';

export default function LandingPage() {
    
    const qualityFollowUps = [
        {
            customer: "Ica",
            consultant: "Agnes",
            date: "2023-09-13"
        },
        {
            customer: "Systembolaget",
            consultant: "Wilma",
            date: "2023-09-13"
        },
        {
            customer: "Lunds uni",
            consultant: "Emelie",
            date: "2023-09-13"
        },
        {
            customer: "Lucas",
            consultant: "Lucas",
            date: "2023-09-13"
        }
    ];
    
    return (
        <Grid container spacing={2} className="outerGrid">
            {/* First row */}
            <Grid item xs={6} className="topRow centerContent">
                <Avatar 
                    sx={{width: 80, height: 80, marginRight: '10px'}}
                    src="https://skansen.se/wp-content/uploads/2022/10/Kattunge_2015_Marie_Andersson-e1666257161606.jpg"
                />
                <h4>Agnes Davidsdóttir</h4>
            </Grid>
            <Grid item xs={6} className="topRow">
                <Button href="./formgrid" variant="contained"> Skapa ny form </Button>
            </Grid>
            {/* Second row */}
            <Grid item xs={12} className="bottomRow">
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>Konsult...</AccordionSummary>
                    <AccordionDetails>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Kund</TableCell>
                                        <TableCell>Konsult</TableCell>
                                        <TableCell>Datum</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {qualityFollowUps.map((followUp, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{followUp.customer}</TableCell>
                                                <TableCell>{followUp.consultant}</TableCell>
                                                <TableCell>{followUp.date}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    );
}