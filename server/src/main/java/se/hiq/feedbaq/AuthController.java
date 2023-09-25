package se.hiq.feedbaq;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.IncorrectResultSizeDataAccessException;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @PostMapping("/sign-in")
    public ResponseEntity<Object> signIn(@RequestBody Map<String, String> requestBody) {
        
        String email = requestBody.get("email");

        
        try {
            
            String sql = "SELECT * FROM users WHERE email=?";
            Map<String, Object> result = jdbcTemplate.queryForMap(sql, email);
            
            String reqPassword = requestBody.get("password");
            String actPassword = result.get("password").toString();
            
            // KOLLA ATT LÖSEN MATCHAR
            if (!reqPassword.equals(actPassword)) {
                // Returnera ett fel som beskriver att det är fel lösenord...
                String errorMessage = "Incorrect password.";
                return new ResponseEntity<>(errorMessage, HttpStatus.UNAUTHORIZED);
            }
            
            // EVENTUELLT ATT JWT SKA IN HÄR :)
            // Returnera nödvändig information (användaren är i detta steget autentiserad...)
            return new ResponseEntity<>(result, HttpStatus.OK);
            
            
        } catch (IncorrectResultSizeDataAccessException e) {
            // HANTERA ATT ANVÄNDARE EJ EXISTERAR...
            String errorMessage = "User with email " + email + " does not exist.";
            return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
        } catch (DataAccessException e) {
            String errorMessage = "An error occured while trying to sign in: " + e.getMessage();
            return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    
    }
    

}