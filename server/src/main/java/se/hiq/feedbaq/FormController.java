package se.hiq.feedbaq;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;

import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FormController {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @GetMapping("/forms")
    public ResponseEntity<Object> getForms() {
        try{
            List<Map<String, Object>> res = jdbcTemplate.queryForList("SELECT * FROM forms;");
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (DataAccessException e) {
            String errorMessage = "An error occurred while fetching forms: " + e.getMessage();
            return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}