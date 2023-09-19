package se.hiq.feedbaq;

//import org.junit.Test;
//import org.junit.runner.RunWith;

// SE ÖVER IMPORTERNA!!!

import org.springframework.boot.test.mock.mockito.Mock;
import org.springframework.test.context.junit4.SpringRunner;

import org.springframework.http.HttpStatus;

import java.util.Map;
import java.util.List;
import java.util.ArrayList;


@RunWith(SpringRunner.class)
public class FormControllerTests {
    
    @Mock
    private JdbcTemplate jdbcTemplate;
    
    private FormController formController;
    
    @Test
    public void testGetForms() {
        
        // Create mock data
        List<Map<String, Object>> mockData = new ArrayList<>();
        Map<String, Object> form1 = new Map<String, Object>();
        form1.put("id", 1);
        form1.put("name", "form1");
        mockData.add(form1);
        
        // Specify jdbc to return mock data when queryForList is called
        when(jdbcTemplate.queryForList("SELECT * FROM forms;").thenReturn(mockData));
        
        // Act
        ResponseEntity<Object> response = formController.getForms();
        
        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockData, response.getBody());
    }
    
}