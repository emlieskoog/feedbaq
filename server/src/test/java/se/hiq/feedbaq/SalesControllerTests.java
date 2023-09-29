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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
public class SalesControllerTests {
    
    @Mock
    private JdbcTemplate jdbcTemplate;

    @InjectMocks
    private SalesController salesController;    
    
    
    @Test
    public void testGetAllSalesSuccess() {
        
        // Create mock data
        List<Map<String, Object>> mockData = new ArrayList<>();
        Map<String, Object> sales = new HashMap<String, Object>();
        sales.put("id", 1);
        sales.put("name", "sales1");
        mockData.add(sales);
        
        // Mock the behavior of jdbcTemplate.queryForList to return mock data above
        when(jdbcTemplate.queryForList("SELECT * FROM users WHERE role='SALES';")).thenReturn(mockData);

        // Act
        ResponseEntity<Object> response = salesController.getAllSales();
        
        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockData, response.getBody());
    }
    
    @Test
    public void testGetAllSalesThrowsException() {
        
        // Mock the behavior of jdbcTemplate.queryForList to throw a DataAccessException
        doThrow(new DataAccessException("Test DataAccessException") {}).when(jdbcTemplate).queryForList("SELECT * FROM users WHERE role='SALES';");

        // Act
        ResponseEntity<Object> response = salesController.getAllSales();

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("An error occurred while fetching sales: Test DataAccessException", response.getBody());
    }
    
    
    
    
}
