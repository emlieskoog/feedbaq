package se.hiq.feedbaq;

import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import se.hiq.feedbaq.security.JWTGenerator;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private JWTGenerator jwtGenerator;


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Map<String, String> requestBody) {
        
        // CHECK IF USER EXISTS
        String sql = "SELECT count(*) FROM users WHERE email=?";
        String email = requestBody.get("email");
        int count = jdbcTemplate.queryForObject(sql, Integer.class, email);
        if (count > 0) {
            return new ResponseEntity<>("Email is taken by another account!", HttpStatus.BAD_REQUEST);
        }

        sql = "INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)";
        String password = passwordEncoder.encode(requestBody.get("password"));
        String name = requestBody.get("name");
        String role = requestBody.get("role");
        
        jdbcTemplate.update(sql, email, password, name, role);

        return new ResponseEntity<>("User registered successfully!", HttpStatus.OK);

    }


    @PostMapping("/sign-in")
    public ResponseEntity<Object> signIn(@RequestBody Map<String, String> requestBody, HttpServletResponse response) {
        
        String email = requestBody.get("email");
        String password = requestBody.get("password");
        Authentication authentication;

        try {
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (AuthenticationException e) {
            return new ResponseEntity<>("Error authenticating user...", HttpStatus.UNAUTHORIZED);
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtGenerator.generateToken(authentication);

        Cookie cookie = new Cookie("jwt", token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);

        return new ResponseEntity<>("User signed in successfully!", HttpStatus.OK);


    }


    /*
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
    */

}