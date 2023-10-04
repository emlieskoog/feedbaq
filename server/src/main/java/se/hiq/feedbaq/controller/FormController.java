package se.hiq.feedbaq.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.IncorrectResultSizeDataAccessException;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FormController {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @PostMapping("/save-form")
    @PreAuthorize("hasAnyAuthority('SALES', 'MANAGER')")
    public ResponseEntity<Object> saveForm(@RequestBody Map<String, Object> requestBody) {

        try {

            //Create a new entity in the form_responses table and return the row id
            String responseQuery = "INSERT INTO form_responses (q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13) " 
            + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id";

            List<Object> formResponseValues = (List<Object>) requestBody.get("formResponseValues");
            Long generatedResponseId = jdbcTemplate.queryForObject(responseQuery, Long.class, formResponseValues.toArray());

            //Create a new entity in the form table
            String formQuery = "INSERT INTO forms_metadata (consultant_id, customer_id, sales_id, date, form_response_id) " 
                + "VALUES (?::int,?::int,?::int,?::date,?::int)";

            jdbcTemplate.update(formQuery, requestBody.get("consultantId"), requestBody.get("customerId"), 
                requestBody.get("salesId"), requestBody.get("date"), generatedResponseId);
            
            return ResponseEntity.ok("Data saved successfully");

        } catch (DataAccessException e) {
            e.printStackTrace(); 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving answers");
        }
    }

    
    @GetMapping("/forms/{id}")
    public ResponseEntity<Object> getFormById(@PathVariable int id) {
        try {
            String formDataQuery = "SELECT * FROM forms_metadata fm JOIN form_responses fr ON fm.form_response_id=fr.id WHERE fm.id=?";
            Map<String, Object> formData = jdbcTemplate.queryForMap(formDataQuery, id);
            int customerId = (int) formData.get("customer_id");
            int consultantId = (int) formData.get("consultant_id");
            int salesId = (int) formData.get("sales_id");
            
            String customerNameQuery = "SELECT customer_name FROM customers WHERE id=?";
            String consultantAndSalesNameQuery = "SELECT name FROM users WHERE id=?";

            Map<String, Object> customerNameMap = jdbcTemplate.queryForMap(customerNameQuery, customerId); // Dessa kan nog göras om till något annat än map direkt...
            Map<String, Object> consultantNameMap = jdbcTemplate.queryForMap(consultantAndSalesNameQuery, consultantId);
            Map<String, Object> salesNameMap = jdbcTemplate.queryForMap(consultantAndSalesNameQuery, salesId);

            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("form_data", formData);
            responseMap.put("customer_name", customerNameMap.get("customer_name").toString());
            responseMap.put("consultant_name", consultantNameMap.get("name").toString());
            responseMap.put("sales_name", salesNameMap.get("name").toString());

            return new ResponseEntity<>(responseMap, HttpStatus.OK);
        } catch (IncorrectResultSizeDataAccessException e) {
            String errorMessage = "Form with ID " + id + " not found.";
            return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
        } catch (DataAccessException e) {
            String errorMessage = "An error occured while fetching form with ID " + id + ": " + e.getMessage();
            return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}