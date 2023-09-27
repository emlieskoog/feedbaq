import { Box } from '@mui/material';
import '../../styles/form.css';

export default function FormDetails() {

    const qualityFollowUp = [
        {
            customer: "Ica",
            consultant: "Agnes",
            date: "2023-09-13",
            text1: 'Konsulten var jätteglad',
            text2: 'Konsulten hade jättekul'
        },
    ];

    return (
        <Box sx={{ height: '100vh', minWidth: '100%' }}>
            <Box sx={{ flexDirection: 'row', display: 'flex', margin: '15px 300px', justifyContent: 'space-evenly' }} >
                <h2> Ica </h2>
                <h2> Agnes </h2>
                <h2> 2023-09-13 </h2>
            </Box>
            <div className='centerContent'>
                <Box sx={{
                    display: 'block',
                    backgroundColor: 'white',
                    border: 1,
                    borderRadius: 2,
                    borderColor: 'lightgrey',
                    m: 1,
                    p: 2,
                    width: '70%'
                }}>
                    {qualityFollowUp.map((followUp, index) => {
                        return (
                            <div>
                                <h3> Kund </h3>
                                <p className='separator'> {followUp.customer} </p>
                                <h3> Konsult </h3>
                                <p className='separator'> {followUp.consultant} </p>
                                <h3> Datum </h3>
                                <p className='separator'> {followUp.date} </p>
                                <h3> Glädje? </h3>
                                <p className='separator'> {followUp.text1} </p>
                                <h3> Kul? </h3>
                                <p> {followUp.text2} </p>
                            </div>
                        );
                    })}
                </Box>
            </div>
        </Box>
    );
}