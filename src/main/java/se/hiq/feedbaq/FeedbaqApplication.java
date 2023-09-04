package se.hiq.feedbaq;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@SpringBootApplication
public class FeedbaqApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(FeedbaqApplication.class, args);
	}

} 
