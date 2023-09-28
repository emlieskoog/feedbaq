package se.hiq.feedbaq;

import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.io.IOException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProfileController {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    
    @GetMapping("/profile")
    public ResponseEntity<Object> getProfileData(HttpServletRequest request) {


        Cookie[] cookies = request.getCookies();
        String token = null;

        for (Cookie cookie: cookies) {
            if (cookie.getName().equals("jwt")) {
                token = cookie.getValue();
            }
        }

        String[] jwtChunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();


        String payload = new String(decoder.decode(jwtChunks[1]));

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> payloadMap = null;
        try {
            payloadMap = objectMapper.readValue(payload, new TypeReference<Map<String, Object>>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        String subject = null;
        if (payloadMap != null && payloadMap.containsKey("sub")) {
            subject = (String) payloadMap.get("sub");
        }

        
        String sql = "SELECT id, email, name, role FROM users WHERE email=?";

        Map<String, Object> result = jdbcTemplate.queryForMap(sql, subject);

        // FORTSÄTT MED ATT HÄMTA FORMS



        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    

    
}