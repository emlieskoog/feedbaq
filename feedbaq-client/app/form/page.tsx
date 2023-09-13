import { Box } from '@mui/material';

export default function FormDetail() {
    return(
        <Box sx={{height:'100vh', minWidth:'100%'}}>
            <Box sx={{flexDirection:'row', display:'flex', margin:'20px 300px', justifyContent: 'space-evenly'}} > 
                <h2> Kund </h2>
                <h2> Konsult </h2>
                <h2> Datum </h2>
            </Box>
            <h3> Glädje </h3>
            <p> Var du glad? </p>
        </Box>
    );
}