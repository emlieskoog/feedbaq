package se.hiq.feedbaq;

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
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
public class FormControllerTests {
    
    @Mock
    private JdbcTemplate jdbcTemplate;

    @InjectMocks
    private FormController formController;
    
    @Test
    public void testGetFormsSuccess() {
        
        // Create mock data
        List<Map<String, Object>> mockData = new ArrayList<>();
        Map<String, Object> form1 = new HashMap<String, Object>();
        form1.put("id", 1);
        form1.put("name", "form1");
        mockData.add(form1);
        
        // Mock the behavior of jdbcTemplate.queryForList to return mock data above
        when(jdbcTemplate.queryForList("SELECT * FROM forms;")).thenReturn(mockData);
        
        // Act
        ResponseEntity<Object> response = formController.getForms();
        
        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockData, response.getBody());
    }
    
    @Test
    public void testGetFormsThrowsException() {
        
        // Mock the behavior of jdbcTemplate.queryForList to throw a DataAccessException
        doThrow(new DataAccessException("Test DataAccessException") {}).when(jdbcTemplate).queryForList("SELECT * FROM forms;");

        // Act
        ResponseEntity<Object> response = formController.getForms();

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("An error occurred while fetching forms: Test DataAccessException", response.getBody());
    }
    
    @Test
    public void testGetFormByIdSuccess() {
        
        // Create mock data
        Map<String, Object> mockData = new HashMap<String, Object>();
        mockData.put("id", 1);
        mockData.put("name", "form1");
        
        // Mock the behavior of jdbcTemplate.queryForMap to return mock data above
        String query = "SELECT * FROM forms WHERE id=?";
        int id = 1;
        when(jdbcTemplate.queryForMap(query, id)).thenReturn(mockData);
        
        // Act
        ResponseEntity<Object> response = formController.getFormById(id);

        // Assert        
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockData, response.getBody());
    }
    
    @Test
    public void testGetFormByIdNotFound() {
        
        // Mock the behavior of jdbcTemplate.queryForMap to throw a IncorrectResultSizeDataAccessException
        String query = "SELECT * FROM forms WHERE id=?";
        int id = 1;
        IncorrectResultSizeDataAccessException exception = new IncorrectResultSizeDataAccessException("Form with ID " + id + " not found.", id);
        doThrow(exception).when(jdbcTemplate).queryForMap(query, id);
        
        // Act
        ResponseEntity<Object> response = formController.getFormById(id);
        
        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Form with ID " + id + " not found.", response.getBody());
        
    }
    
    @Test
    public void testGetFormByIdThrowsDataAccessException() {
        
        // Mock the behavior of jdbcTemplate.queryForMap to throw a DataAccessException
        String query = "SELECT * FROM forms WHERE id=?";
        int id = 1;
        doThrow(new DataAccessException("Test DataAccessException") {}).when(jdbcTemplate).queryForMap(query, id);

        // Act
        ResponseEntity<Object> response = formController.getFormById(id);
        
        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("An error occured while fetching form with ID " + id + ": Test DataAccessException", response.getBody());
        
    }
    
    
}