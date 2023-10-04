package se.hiq.feedbaq.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
public class CustomerControllerTests {
    
    @Mock
    private JdbcTemplate jdbcTemplate;

    @InjectMocks
    private CustomerController customerController;
    
    @Test
    public void testGetAllCustomersSuccess() {
        
        // Create mock data
        List<Map<String, Object>> mockData = new ArrayList<>();
        Map<String, Object> customer = new HashMap<String, Object>();
        customer.put("id", 1);
        customer.put("name", "customer1");
        mockData.add(customer);
        
        // Mock the behavior of jdbcTemplate.queryForList to return mock data above
        when(jdbcTemplate.queryForList("SELECT * FROM customers;")).thenReturn(mockData);

        // Act
        ResponseEntity<Object> response = customerController.getAllCustomers();
        
        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockData, response.getBody());
    }
    
    @Test
    public void testGetAllCustomersThrowsException() {
        
        // Mock the behavior of jdbcTemplate.queryForList to throw a DataAccessException
        doThrow(new DataAccessException("Test DataAccessException") {}).when(jdbcTemplate).queryForList("SELECT * FROM customers;");

        // Act
        ResponseEntity<Object> response = customerController.getAllCustomers();

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("An error occurred while fetching customers: Test DataAccessException", response.getBody());
    }
    
    @SuppressWarnings("unchecked")
    @Test
    public void testGenerateCustomerFormSuccess() {

        // Create a mock body and SQL query
        Map<String, String> requestBody = new HashMap<>(); 
        requestBody.put("consultantId", "1"); 
        requestBody.put("customerId", "2"); 
        requestBody.put("salesId", "3");
        requestBody.put("date", "2022-09-23");
            
        String formQuery = "INSERT INTO customer_form_metadata (uuid, consultant_id, customer_id, sales_id, date, is_valid) " 
            + "VALUES (?,?::int,?::int,?::int,?::date,?::boolean)";

        // Mock a successful jdbcTemplate.update 
        when(jdbcTemplate.update(eq(formQuery), any(Object[].class))).thenReturn(1);

        // Act
        ResponseEntity<Object> response = customerController.generateCustomerForm(requestBody);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());

        Map<String, String> responseObject = (Map<String,String>) response.getBody();
        assertEquals(responseObject.get("message"),"Generated uuid successfully!");
    }

    
    @Test
    public void testGenerateCustomerFormThrowsException() {
        // Create a mock body and SQL query
        Map<String, String> requestBody = new HashMap<>(); 
        requestBody.put("consultantId", "1"); 
        requestBody.put("customerId", "2"); 
        requestBody.put("salesId", "3");
        requestBody.put("date", "2022-09-23");
            
        String formQuery = "INSERT INTO customer_form_metadata (uuid, consultant_id, customer_id, sales_id, date, is_valid) " 
            + "VALUES (?,?::int,?::int,?::int,?::date,?::boolean)";

        
            // Mock a database update failure
        when(jdbcTemplate.update(eq(formQuery), any(Object[].class))).thenThrow(new DataAccessException("Database error") {});

        // Act
        ResponseEntity<Object> response = customerController.generateCustomerForm(requestBody);

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("Error generating link", response.getBody());
    }

    @Test
    public void testGetCustomerFormSuccess() {

        // Create mock data and SQL query
        String uuid = "abc123";
        Map<String, Object> mockData = new HashMap<>();
        mockData.put("uuid", uuid);
        mockData.put("is_valid", true);

        String sql = "SELECT cf.consultant_id, cf.customer_id, cf.sales_id, cf.date, u1.name AS consultant_name, u2.name AS sales_name, c.customer_name " +
                     "FROM customer_form_metadata cf " +
                     "LEFT JOIN users u1 ON cf.consultant_id = u1.id " +
                     "LEFT JOIN users u2 ON cf.sales_id = u2.id " +
                     "LEFT JOIN customers c ON cf.customer_id = c.id " +
                     "WHERE cf.uuid = ?";

        // Mock behavior of jdbcTemplate.queryForMap to return mock data above
        when(jdbcTemplate.queryForMap(sql, uuid)).thenReturn(mockData);

        // Act
        ResponseEntity<Object> response = customerController.getCustomerForm(uuid);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockData, response.getBody());

    }


    @Test
    public void testGetCustomerFormNotFound() {

        // uuid, SQL query and exception
        String uuid = "abc123";
        String sql = "SELECT cf.consultant_id, cf.customer_id, cf.sales_id, cf.date, u1.name AS consultant_name, u2.name AS sales_name, c.customer_name " +
                     "FROM customer_form_metadata cf " +
                     "LEFT JOIN users u1 ON cf.consultant_id = u1.id " +
                     "LEFT JOIN users u2 ON cf.sales_id = u2.id " +
                     "LEFT JOIN customers c ON cf.customer_id = c.id " +
                     "WHERE cf.uuid = ?";
        IncorrectResultSizeDataAccessException exception = new IncorrectResultSizeDataAccessException(1);

        // Mock behavior of jdbcTemplate.queryForMap to throw IncorrectResultSizeDataAccessException
        doThrow(exception).when(jdbcTemplate).queryForMap(sql,uuid);

        // Act
        ResponseEntity<Object> response = customerController.getCustomerForm(uuid);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Customer form with uuid " + uuid + " does not exist.", response.getBody());

    }


    @Test
    public void testGetCustomerFormThrowsDataAccessException() {

        // uuid, SQL query, error message and exception
        String uuid = "abc123";
        String sql = "SELECT cf.consultant_id, cf.customer_id, cf.sales_id, cf.date, u1.name AS consultant_name, u2.name AS sales_name, c.customer_name " +
                     "FROM customer_form_metadata cf " +
                     "LEFT JOIN users u1 ON cf.consultant_id = u1.id " +
                     "LEFT JOIN users u2 ON cf.sales_id = u2.id " +
                     "LEFT JOIN customers c ON cf.customer_id = c.id " +
                     "WHERE cf.uuid = ?";
        String errorMessage = "An error occured when trying to access metadata for customer form with uuid: " + uuid + ". Test DataAccessException";

        DataAccessException exception = new DataAccessException("Test DataAccessException") {};

        // Mock behavior of jdbcTemplate.queryForMap to throw DataAccessException
        doThrow(exception).when(jdbcTemplate).queryForMap(sql, uuid);

        // Act
        ResponseEntity<Object> response = customerController.getCustomerForm(uuid);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals(errorMessage, response.getBody());

    }


    /* STUBBING ERROR, UNDERSÖK!
    @Test
    public void testSaveCustomerFormSuccess() {
        // Mock data, SQL query and exception
        String uuid = "abc123";
        List<Object> formResponseValues = new ArrayList<>();
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("uuid", uuid);
        requestBody.put("formResponseValues", formResponseValues);
        String uuidCheckSql = "SELECT count(*) FROM customer_form_metadata WHERE uuid=? AND is_valid=true";
        String insertSql = "INSERT INTO customer_form_responses (uuid, q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        List<Object> arguments = new ArrayList<>();
        arguments.add(uuid);
        arguments.add(formResponseValues);
        String successMessage = "Data saved successfully!";

        // Mock behavior of jdbc.queryForObject to return existing and valid uuid
        when(jdbcTemplate.queryForObject(uuidCheckSql, Integer.class, uuid)).thenReturn(1);
        
        // Mock behavior of jdbc.update to insert successfully
        when(jdbcTemplate.update(insertSql, arguments.toArray())).thenReturn(1); // DENNA ÄR FEL?

        // Act
        ResponseEntity<Object> response = customerController.saveCustomerForm(requestBody);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(successMessage, response.getBody());


    }
    */


    @Test
    public void testSaveCustomerFormUuidNotExistOrNotValid() {

        String uuid = "abc123";
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("uuid", uuid);

        String sql = "SELECT count(*) FROM customer_form_metadata WHERE uuid=? AND is_valid=true";

        when(jdbcTemplate.queryForObject(sql, Integer.class, uuid)).thenReturn(0);

        String errorMessage = "Customer form with uuid " + uuid + " does not exist or is not valid.";

        ResponseEntity<Object> response = customerController.saveCustomerForm(requestBody);

        assertNotNull(response);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals(errorMessage, response.getBody());

    }


    /* STUBBING ERROR, UNDERSÖK!!!
    @Test
    public void testSaveCustomerFormThrowsDataAccessException() {

        // Mock data, SQL query and exception
        String uuid = "abc123";
        List<Object> formResponseValues = new ArrayList<>();
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("uuid", uuid);
        requestBody.put("formResponseValues", formResponseValues);
        String uuidCheckSql = "SELECT count(*) FROM customer_form_metadata WHERE uuid=? AND is_valid=true";
        String insertSql = "INSERT INTO customer_form_responses (uuid, q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        List<Object> arguments = new ArrayList<>();
        arguments.add(uuid);
        arguments.add(formResponseValues);
        DataAccessException exception = new DataAccessException("Test DataAccessException") {};
        String errorMessage = "An issue occured when trying to insert form responses.";

        // Mock behavior of jdbc.queryForObject to return existing and valid uuid
        when(jdbcTemplate.queryForObject(uuidCheckSql, Integer.class, uuid)).thenReturn(1);
        
        // Mock behavior of jdbc.update to throw DataAccessException
        doThrow(exception).when(jdbcTemplate).update(insertSql, arguments.toArray()); // Denna är fel???

        // Act
        ResponseEntity<Object> response = customerController.saveCustomerForm(requestBody);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals(errorMessage, response.getBody());

    }
    */

}
