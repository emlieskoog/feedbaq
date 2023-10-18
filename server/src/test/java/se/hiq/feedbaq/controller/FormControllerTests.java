package se.hiq.feedbaq.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Arrays;

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
public class FormControllerTests {
    
    @Mock
    private JdbcTemplate jdbcTemplate;

    @InjectMocks
    private FormController formController;

    
    @Test
    public void testGetFormByIdSuccess() {

        int id = 1; 
        int customerId = 1;
        int consultantId = 1;
        int salesId = 1; 
        
        String formDataQuery = "SELECT * FROM form_metadata fm JOIN form_responses fr ON fm.form_response_id=fr.id WHERE fm.id=?";
        
        Map<String, Object> formData = new HashMap<>();
        formData.put("customer_id", 1);
        formData.put("consultant_id", 1);
        formData.put("sales_id", 1);
            
        when(jdbcTemplate.queryForMap(formDataQuery, id)).thenReturn(formData);
        
        String customerNameQuery = "SELECT customer_name FROM customers WHERE id=?";
        String consultantAndSalesNameQuery = "SELECT name FROM users WHERE id=?";

        Map<String, Object> customerNameMap = new HashMap<>();
        customerNameMap.put("customer_name", "Helena");
        Map<String, Object> consultantNameMap = new HashMap<>();
        consultantNameMap.put("name", "Gunilla"); 
        Map<String, Object> salesNameMap = new HashMap<>();
        salesNameMap.put("name", "Gertrud");

        when(jdbcTemplate.queryForMap(customerNameQuery, customerId)).thenReturn(customerNameMap);
        when(jdbcTemplate.queryForMap(consultantAndSalesNameQuery, consultantId)).thenReturn(consultantNameMap);
        when(jdbcTemplate.queryForMap(consultantAndSalesNameQuery, salesId)).thenReturn(salesNameMap);
        
        // Act
        ResponseEntity<Object> response = formController.getFormById(id);

        // Assert        
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
     

    @Test
    public void testGetFormByIdNotFound() {
    
        // Mock the behavior of jdbcTemplate.queryForMap to throw a IncorrectResultSizeDataAccessException
        String formDataQuery = "SELECT * FROM form_metadata fm JOIN form_responses fr ON fm.form_response_id=fr.id WHERE fm.id=?";

        int id = 1;
        IncorrectResultSizeDataAccessException exception = new IncorrectResultSizeDataAccessException("Form with ID " + id + " not found.", id);
        doThrow(exception).when(jdbcTemplate).queryForMap(formDataQuery, id);
        
        // Act
        ResponseEntity<Object> response = formController.getFormById(id);
        
        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Form with ID " + id + " not found.", response.getBody());
        
    }

    @Test
    public void testGetFormByIdThrowsDataAccessException() {
        
        // Mock the behavior of jdbcTemplate.queryForMap to throw a DataAccessException
        String formDataQuery = "SELECT * FROM form_metadata fm JOIN form_responses fr ON fm.form_response_id=fr.id WHERE fm.id=?";
        int id = 1;
        doThrow(new DataAccessException("Test DataAccessException") {}).when(jdbcTemplate).queryForMap(formDataQuery, id);

        // Act
        ResponseEntity<Object> response = formController.getFormById(id);
        
        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("An error occured while fetching form with ID " + id + ": Test DataAccessException", response.getBody());
        
    }

    @Test
    public void testSaveFormSuccess() {

        // Create a mock body and SQL query
        List<String> formResponseValues = Arrays.asList("r1", "r2", "r3","r4","r5","r6","r7","r8","r9","r10","r11","r12");
        Map<String, Object> requestBody = new HashMap<>(); 
        requestBody.put("consultantId", "1"); 
        requestBody.put("customerId", "2"); 
        requestBody.put("salesId", "3");
        requestBody.put("date", "2022-09-23");
        requestBody.put("formResponseValues", formResponseValues);
    
        String responseQuery = "INSERT INTO form_responses (q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13) " 
            + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id";
        String formQuery = "INSERT INTO form_metadata (consultant_id, customer_id, sales_id, date, form_response_id) " 
            + "VALUES (?::int,?::int,?::int,?::date,?::int)";

        Long expectedResponseId = 1L;
        when(jdbcTemplate.queryForObject(eq(responseQuery), eq(Long.class), any(Object[].class))).thenReturn(expectedResponseId);

        // Mock a successful jdbcTemplate.update 
        when(jdbcTemplate.update(eq(formQuery), any(Object[].class))).thenReturn(1);

        // Act
        ResponseEntity<Object> response = formController.saveForm(requestBody);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(response.getBody(),"Data saved successfully");
    }
    
    @Test
    public void testSaveFormThrowsException() {

        // Create a mock body and SQL query
        List<String> formResponseValues = Arrays.asList("r1", "r2", "r3","r4","r5","r6","r7","r8","r9","r10","r11","r12");
        Map<String, Object> requestBody = new HashMap<>(); 
        requestBody.put("consultantId", "1"); 
        requestBody.put("customerId", "2"); 
        requestBody.put("salesId", "3");
        requestBody.put("date", "2022-09-23");
        requestBody.put("formResponseValues", formResponseValues);
    
        String responseQuery = "INSERT INTO form_responses (q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13) " 
            + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id";
        String formQuery = "INSERT INTO form_metadata (consultant_id, customer_id, sales_id, date, form_response_id) " 
            + "VALUES (?::int,?::int,?::int,?::date,?::int)";

        Long expectedResponseId = 1L;
        when(jdbcTemplate.queryForObject(eq(responseQuery), eq(Long.class), any(Object[].class))).thenReturn(expectedResponseId);

        // Mock a database update failure
        when(jdbcTemplate.update(eq(formQuery), any(Object[].class))).thenThrow(new DataAccessException("Database error") {});

        // Act
        ResponseEntity<Object> response = formController.saveForm(requestBody);

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("Error saving answers", response.getBody());
    }
}