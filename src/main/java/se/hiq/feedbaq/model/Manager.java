package se.hiq.feedbaq;

import java.util.ArrayList;

public class Manager extends User {
    
    // Manager-specific attributes
    private ArrayList<Consultant> consultants;
    
    // Constructors
    public Manager() {}
    
    public Manager(long id, String email, String password, String firstName, String lastName) {
        super(id, email, password, firstName, lastName);
        this.consultants = new ArrayList<>();
    }
    
    public Manager(String email, String password, String firstName, String lastName) {
        super(email, password, firstName, lastName);
        this.consultants = new ArrayList<>();
    }
    
    // Getters
    public ArrayList<Consultant> getConsultants() {
        return consultants;
    }
    
    // Setters
    public void setConsultants(ArrayList<Consultant> consultants) {
        this.consultants = consultants;
    }

}