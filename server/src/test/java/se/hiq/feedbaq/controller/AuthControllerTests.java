package se.hiq.feedbaq.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import se.hiq.feedbaq.security.JWTGenerator;

@ExtendWith(MockitoExtension.class)
public class AuthControllerTests {

    @Mock
    private JdbcTemplate jdbcTemplate;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JWTGenerator jwtGenerator;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthController authController;
    
    @Test
    public void testRegisterEmailAlreadyInUse() {

        // Create mock data
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("email", "test@hiq.se");

        // SQL query
        String sql = "SELECT count(*) FROM users WHERE emaila=?";

        // Mock behavior of jdbcTemplate.queryForObject to return 1
        when(jdbcTemplate.queryForObject(sql, Integer.class, requestBody.get("email"))).thenReturn(1);

        // Act
        ResponseEntity<String> response = authController.register(requestBody);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Email is taken by another account!", response.getBody());

    }


    @Test
    public void testRegisterSuccess() {

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("email", "test@hiq.se");
        requestBody.put("password", "password");
        requestBody.put("name", "test");
        requestBody.put("role", "manager");

        String checkEmailSql = "SELECT count(*) FROM users WHERE email=?";
        String insertNewUserSql = "INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)";

        String encodedPassword = "fakeEncodedPassword";

        when(jdbcTemplate.queryForObject(checkEmailSql, Integer.class, requestBody.get("email"))).thenReturn(0);
        when(passwordEncoder.encode(requestBody.get("password"))).thenReturn(encodedPassword);
        when(jdbcTemplate.update(insertNewUserSql, requestBody.get("email"), encodedPassword, requestBody.get("name"), requestBody.get("role"))).thenReturn(1);


        ResponseEntity<String> response = authController.register(requestBody);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User registered successfully!", response.getBody());

        verify(passwordEncoder).encode(requestBody.get("password"));
        verify(jdbcTemplate).update(insertNewUserSql, requestBody.get("email"), encodedPassword, requestBody.get("name"), requestBody.get("role"));

    }
    

    @Test
    public void testSignInThrowsAuthenticationException() {

        // Arrange
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("email", "test@hiq.se");
        requestBody.put("password", "password");
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(requestBody.get("email"), requestBody.get("password"));
        AuthenticationException authException = new AuthenticationException("Test AuthenticationException") {};

        // Mock behavior
        when(authenticationManager.authenticate(usernamePasswordAuthenticationToken)).thenThrow(authException);

        // Act
        ResponseEntity<Object> response = authController.signIn(requestBody, null);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Error authenticating user...", response.getBody());

    }

    @Test
    public void testSignInSuccess() {

        // Arrange
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("email", "test@hiq.se");
        requestBody.put("password", "password");
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(requestBody.get("email"), requestBody.get("password"));
        Authentication authentication = mock(Authentication.class);

        // Mock behavior
        when(authenticationManager.authenticate(usernamePasswordAuthenticationToken)).thenReturn(authentication);
        when(jwtGenerator.generateToken(authentication)).thenReturn("fakeToken");

        // Create a mock HttpServletResponse
        HttpServletResponse response = mock(HttpServletResponse.class);

        // Act
        ResponseEntity<Object> responseEntity = authController.signIn(requestBody, response);

        // Assert
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("User signed in successfully!", responseEntity.getBody());        

        // Verify that a cookie was added to the response
        verify(response).addCookie(any(Cookie.class));
    
    }

    
}
