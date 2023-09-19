package se.hiq.feedbaq;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.IncorrectResultSizeDataAccessException;

import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FormController {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @GetMapping("/forms")
    public ResponseEntity<Object> getForms() {
        try {
            List<Map<String, Object>> result = jdbcTemplate.queryForList("SELECT * FROM forms;");
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (DataAccessException e) {
            String errorMessage = "An error occurred while fetching forms: " + e.getMessage();
            return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    @GetMapping("/forms/{id}")
    public ResponseEntity<Object> getFormById(@PathVariable int id) {
        try {
            String query = "SELECT * FROM forms WHERE id=?";
            Map<String, Object> result = jdbcTemplate.queryForMap(query, id);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (IncorrectResultSizeDataAccessException e) {
            String errorMessage = "Form with ID " + id + " not found.";
            return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
        } catch (DataAccessException e) {
            String errorMessage = "An error occured while fetching form with ID " + id + ": " + e.getMessage();
            return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}