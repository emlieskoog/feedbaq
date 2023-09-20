package se.hiq.feedbaq;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FormController {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @GetMapping("/forms")
    public ResponseEntity<Object> getAllForms() {
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

    @PostMapping("/save-form")
    public ResponseEntity<Object> postForm(@RequestBody List<String> request) {
        try {
            String query = "INSERT INTO form_responses (q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12) " 
                + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            jdbcTemplate.update(query, request.toArray());

            return ResponseEntity.ok("Data saved successfully");
        } catch (DataAccessException e) {
            e.printStackTrace(); 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving answers");
        }
    }
        
    @GetMapping("/forms/consultants/{consultantId}")
    public ResponseEntity<Object> getFormsForConsultants(@PathVariable int consultantId) { // RequestParam: encodar URI
        try {
            String query = "SELECT * FROM forms WHERE consultant_id=?";
            List<Map<String, Object>> result = jdbcTemplate.queryForList(query, consultantId);
            if (result.isEmpty()) {
                String message = "No forms found for consultant with ID " + consultantId + ".";
                return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (DataAccessException e) {
            String errorMessage = "An error occured while fetching forms for consultant with ID " + consultantId + ": " + e.getMessage();
            return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/forms/managers/{managerId}")
    public ResponseEntity<Object> getFormsForManagers(@PathVariable int managerId) {
        try {
            String query = "SELECT * FROM forms WHERE manager_id=?";
            List<Map<String, Object>> result = jdbcTemplate.queryForList(query, managerId);
            if (result.isEmpty()) {
                String message = "No forms found for manager with ID " + managerId + ".";
                return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (DataAccessException e) {
            String errorMessage = "An error occurred while fetching forms for manager with ID " + managerId + ": " + e.getMessage();
            return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

    @GetMapping("/forms/sales/{salesId}")
    public ResponseEntity<Object> getFormsForSales(@PathVariable int salesId) {
        try {
            String query = "SELECT * FROM forms WHERE sales_id=?";
            List<Map<String, Object>> result = jdbcTemplate.queryForList(query, salesId);
            if (result.isEmpty()) {
                String message = "No forms found for sales with ID " + salesId + ".";
                return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (DataAccessException e) {
            String errorMessage = "An error occurred while fetching forms for sales with ID " + salesId + ": " + e.getMessage();
            return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}