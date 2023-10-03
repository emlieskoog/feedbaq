package se.hiq.feedbaq;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataAccessException;
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
    
}
