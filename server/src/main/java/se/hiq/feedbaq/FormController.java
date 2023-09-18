package se.hiq.feedbaq;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashMap;
import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FormController {
    
    @GetMapping("/forms")
    public ResponseEntity<Object> getForms() {
        ArrayList<Object> forms = new ArrayList<Object>();

        HashMap<String, String> form1 = new HashMap<String, String>();
        
        form1.put("id", "1");
        form1.put("customer", "Ica");
        form1.put("consultant", "Agnes");
        form1.put("date", "2023-08-13");
        
        forms.add(form1);

        HashMap<String, String> form2 = new HashMap<String, String>();
        
        form2.put("id", "2");
        form2.put("customer", "Systembolaget");
        form2.put("consultant", "Lucas");
        form2.put("date", "2023-08-23");
        
        forms.add(form2);

        HashMap<String, String> form3 = new HashMap<String, String>();
        
        form3.put("id", "3");
        form3.put("customer", "Apotektet");
        form3.put("consultant", "Emelie");
        form3.put("date", "2023-08-03");
        
        forms.add(form3);

        HashMap<String, String> form4 = new HashMap<String, String>();
        
        form4.put("id", "4");
        form4.put("customer", "Nocco");
        form4.put("consultant", "Wilma");
        form4.put("date", "2023-08-15");
        
        forms.add(form4);

        return new ResponseEntity<>(forms, HttpStatus.OK);
    }
    
}