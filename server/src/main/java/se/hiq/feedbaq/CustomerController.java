package se.hiq.feedbaq;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @GetMapping("/customers")
    public ResponseEntity<Object> getAllCustomers() {
        try {
            List<Map<String, Object>> result = jdbcTemplate.queryForList("SELECT * FROM customers;");
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (DataAccessException e) {
            String errorMessage = "An error occurred while fetching customers: " + e.getMessage();
            return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/customer-form")
    public ResponseEntity<Object> generateCustomerForm(@RequestBody Map<String, String> requestBody) {

        try {
            UUID uuid = UUID.randomUUID();
            
            String formQuery = "INSERT INTO customer_form_metadata (uuid, consultant_id, customer_id, sales_id, date, is_valid) " 
                + "VALUES (?,?::int,?::int,?::int,?::date,?::boolean)";

            jdbcTemplate.update(formQuery, uuid, requestBody.get("consultantId"), requestBody.get("customerId"), 
                requestBody.get("salesId"), requestBody.get("date"), true);

            Map<String,String> responseObject = new HashMap<>();
            responseObject.put("uuid", uuid.toString()); 
            responseObject.put("message", "Generated uuid successfully!"); 

            return ResponseEntity.ok()
                .body(responseObject);

        } catch (DataAccessException e) {
            e.printStackTrace(); 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error generating link");
        }
    }
    
}
