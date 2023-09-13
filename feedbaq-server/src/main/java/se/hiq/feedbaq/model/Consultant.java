package se.hiq.feedbaq;

public class Consultant extends User {
    
    // Constructors
    public Consultant() {}
    
    public Consultant(long id, String email, String password, String firstName, String lastName) {
        super(id, email, password, firstName, lastName);
    }
    
    public Consultant(String email, String password, String firstName, String lastName) {
        super(email, password, firstName, lastName);
    }
    
}