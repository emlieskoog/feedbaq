import { Card, TextField } from '@mui/material';
import '../styles/form.css';

export default function QuestionTemplate() {
    
    return (
        <Card sx={{height: '100%', minWidth: '100%'}} className="centerContent">
            <h4>Title....</h4>
            <TextField variant="outlined" />
        </Card>
    );
    
}