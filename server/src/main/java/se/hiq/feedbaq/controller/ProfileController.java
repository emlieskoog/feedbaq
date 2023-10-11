package se.hiq.feedbaq.controller;

import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import se.hiq.feedbaq.security.JWTAuthenticationFilter;
import se.hiq.feedbaq.security.JWTGenerator;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
public class ProfileController {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @Autowired 
    private JWTAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private JWTGenerator jwtGenerator;
    
    @GetMapping("/profile")
    public ResponseEntity<Object> getProfileData(HttpServletRequest request) {
        
        String token = jwtAuthenticationFilter.getJWTFromRequest(request);
        String subject = jwtGenerator.getUsernameFromJWT(token);
        
        String sql = "SELECT id, name, role FROM users WHERE email=?";

        Map<String, Object> result = jdbcTemplate.queryForMap(sql, subject);

        int userId = (int) result.get("id");
        String name = result.get("name").toString();
        String role = result.get("role").toString();

        String formQuery = null;

        if (role.equals("CONSULTANT")) {
            formQuery = "SELECT f.id, c.customer_name, f.date FROM forms_metadata f JOIN customers c ON f.customer_id=c.id WHERE f.consultant_id=?";
        }

        if (role.equals("MANAGER")) {
            formQuery = "SELECT f.id, u.name, cu.customer_name, f.date FROM forms_metadata f JOIN users u ON f.consultant_id=u.id JOIN customers cu ON f.customer_id=cu.id JOIN consultants_managers cm ON f.consultant_id=cm.consultant_id WHERE cm.manager_id=?";
        }
        
        if (role.equals("SALES")) {
            formQuery = "SELECT f.id, u.name, cu.customer_name, f.date FROM forms_metadata f JOIN users u ON f.consultant_id=u.id JOIN customers cu ON f.customer_id=cu.id WHERE f.sales_id=?";            
        }

        List<Map<String, Object>> forms = jdbcTemplate.queryForList(formQuery, userId);

        Map<String, Object> responseObject = new HashMap<>();
        responseObject.put("userId", userId);
        responseObject.put("name", name);
        responseObject.put("role", role);
        responseObject.put("forms", forms);

        return new ResponseEntity<>(responseObject, HttpStatus.OK);
    }

    

    
}