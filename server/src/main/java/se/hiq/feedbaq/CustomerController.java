package se.hiq.feedbaq;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.jdbc.core.JdbcTemplate;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.IncorrectResultSizeDataAccessException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @GetMapping("/customer-form/{uuid}")
    public ResponseEntity<Object> getCustomerForm(@PathVariable String uuid) {

        String sql = "SELECT cf.consultant_id, cf.customer_id, cf.sales_id, cf.date, u1.name AS consultant_name, u2.name AS sales_name, c.customer_name " +
                     "FROM customer_form_metadata cf " +
                     "LEFT JOIN users u1 ON cf.consultant_id = u1.id " +
                     "LEFT JOIN users u2 ON cf.sales_id = u2.id " +
                     "LEFT JOIN customers c ON cf.customer_id = c.id " +
                     "WHERE cf.uuid = ?";

        Map<String, Object> customerFormData;

        try {
            customerFormData = jdbcTemplate.queryForMap(sql, uuid);
        } catch (IncorrectResultSizeDataAccessException e) {
            String errorMessage = "Customer form with uuid " + uuid + " does not exist.";
            return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
        } catch (DataAccessException e) {
            String errorMessage = "An error occured when trying to access metadata for customer form with uuid: " + uuid + ". " + e.getMessage();
            return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(customerFormData, HttpStatus.OK);
    }


    @PostMapping("/save-customer-form")
    public ResponseEntity<Object> saveForm(@RequestBody Map<String, Object> requestBody) {

        String uuid = requestBody.get("uuid").toString();

        // Check if uuid exists...
        if (!doesUuidExist(uuid)) {
            String errorMessage = "Customer form uuid " + uuid + " does not exist.";
            return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
        }    

        // LÄGG TILL EN KONTROLL FÖR ATT SE OM UUID ÄR VALID

        List<Object> formResponseValues = (List<Object>) requestBody.get("formResponseValues");
        
        if (insertFormResponses(uuid, formResponseValues)) {
            return new ResponseEntity<>("Data saved successfully!", HttpStatus.OK);
        } else {
            String errorMessage = "An issue occurred when trying to insert form responses.";
            return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    private boolean doesUuidExist(String uuid) {
        String uuidCheckSql = "SELECT count(*) FROM customer_form_metadata WHERE uuid=?";
        int count = jdbcTemplate.queryForObject(uuidCheckSql, Integer.class, uuid);
        return count > 0;
    }

    private boolean insertFormResponses(String uuid, List<Object> formResponseValues) {
        String sql = "INSERT INTO customer_form_responses (uuid, q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        List<Object> arguments = new ArrayList<>();
        arguments.add(uuid);
        arguments.addAll(formResponseValues);
    
        try {
            jdbcTemplate.update(sql, arguments.toArray());
            return true;
        } catch (DataAccessException e) {
            return false;
        }
    }

    
}
