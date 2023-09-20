// package se.hiq.feedbaq;

// import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.http.ResponseEntity;
// import org.springframework.http.HttpStatus;
// import org.springframework.jdbc.core.JdbcTemplate;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.dao.DataAccessException;
// import org.springframework.web.bind.annotation.PathVariable;

// import java.util.List;
// import java.util.Map;

// @RestController
// @CrossOrigin(origins = "http://localhost:3000")
// public class ConsultantController {

//     @Autowired
//     private JdbcTemplate jdbcTemplate;

//     @GetMapping("/{id}")
//     public ResponseEntity<Object> getConsultantById(@PathVariable("id") long consultant_id) {
//         try {
//             String sql = "SELECT * FROM consultants WHERE id = ?;";
//             Map<String, Object> consultant = jdbcTemplate.queryForMap(sql, consultant_id);
//             return new ResponseEntity<>(consultant, HttpStatus.OK);
//         } catch (DataAccessException e) {
//             String errorMessage = "An error occurred while fetching consultant with ID " + consultant_id ": " + e.getMessage();
//             return new ResponseEntity<>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }

// }