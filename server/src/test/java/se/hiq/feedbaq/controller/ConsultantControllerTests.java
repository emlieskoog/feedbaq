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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
public class ConsultantControllerTests {
    
    @Mock
    private JdbcTemplate jdbcTemplate;

    @InjectMocks
    private ConsultantController consultantController;    
    
    @Test
    public void testGetAllConsultantsSuccess() {
        
        // Create mock data
        List<Map<String, Object>> mockData = new ArrayList<>();
        Map<String, Object> consultant = new HashMap<String, Object>();
        consultant.put("id", 1);
        consultant.put("name", "consultant1");
        mockData.add(consultant);

        String sql = "SELECT uc.id, uc.name, uc.role, um.name AS manager_name FROM users uc "+
        "LEFT JOIN consultants_managers cm ON uc.id=cm.consultant_id "+
        "LEFT JOIN users um ON cm.manager_id=um.id "+
        "WHERE uc.role='CONSULTANT';";
        
        // Mock the behavior of jdbcTemplate.queryForList to return mock data above
        when(jdbcTemplate.queryForList(sql)).thenReturn(mockData);

        // Act
        ResponseEntity<Object> response = consultantController.getAllConsultants();
        
        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockData, response.getBody());
    }
    
    @Test
    public void testGetAllConsultantsThrowsException() {
        
        String sql = "SELECT uc.id, uc.name, uc.role, um.name AS manager_name FROM users uc "+
        "LEFT JOIN consultants_managers cm ON uc.id=cm.consultant_id "+
        "LEFT JOIN users um ON cm.manager_id=um.id "+
        "WHERE uc.role='CONSULTANT';";

        // Mock the behavior of jdbcTemplate.queryForList to throw a DataAccessException
        doThrow(new DataAccessException("Test DataAccessException") {}).when(jdbcTemplate).queryForList(sql);

        // Act
        ResponseEntity<Object> response = consultantController.getAllConsultants();

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("An error occurred while fetching consultants: Test DataAccessException", response.getBody());
    }
    
    
}
