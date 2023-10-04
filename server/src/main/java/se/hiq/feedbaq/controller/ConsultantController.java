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
public class ConsultantController {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @GetMapping("/consultants")
    @PreAuthorize("hasAnyAuthority('SALES', 'MANAGER')")
    public ResponseEntity<Object> getAllConsultants() {
        try {
            List<Map<String, Object>> result = jdbcTemplate.queryForList("SELECT uc.id, uc.name, uc.role, um.name AS manager_name FROM users uc "+
                "LEFT JOIN consultants_managers cm ON uc.id=cm.consultant_id "+
                "LEFT JOIN users um ON cm.manager_id=um.id "+
                "WHERE uc.role='CONSULTANT';");
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (DataAccessException e) {
            String errorMessage = "An error occurred while fetching consultants: " + e.getMessage();
            return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}