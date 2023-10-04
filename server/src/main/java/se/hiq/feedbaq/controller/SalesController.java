package se.hiq.feedbaq.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SalesController {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @GetMapping("/sales")
    @PreAuthorize("hasAnyAuthority('SALES', 'MANAGER')")
    public ResponseEntity<Object> getAllSales() {
        try {
            List<Map<String, Object>> result = jdbcTemplate.queryForList("SELECT * FROM users WHERE role='SALES';");
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (DataAccessException e) {
            String errorMessage = "An error occurred while fetching sales: " + e.getMessage();
            return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}