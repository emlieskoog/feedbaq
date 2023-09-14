import { Button } from "@mui/material";
import '../styles/login.css';

export default function LoginPage() {
    return(
        <div className="root">
            <img src="/feedbaq.png" alt="Your Image" className="image"/>
            <Button variant="contained" href="/profile">Logga in</Button>
        </div>
    );
}