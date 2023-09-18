package se.hiq.feedbaq;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.HashMap;

@RestController
public class FormController {
    
    @GetMapping("/forms")
    public ResponseEntity<Object> getForms() {
        HashMap<String, String> forms = new HashMap<String, String>();
        forms.put("form1", "data form1");
        forms.put("form2", "data form2");
        return new ResponseEntity<>(forms, HttpStatus.OK);
    }
    
}
