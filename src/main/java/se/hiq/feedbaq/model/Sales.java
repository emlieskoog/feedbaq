package se.hiq.feedbaq;

import java.util.ArrayList;

public class Sales extends User {
    
    // Sales-specific attributes
    private ArrayList<Customer> customers;
    
    // Constructors
    public Sales() {}
    
    public Sales(long id, String email, String password, String firstName, String lastName) {
        super(id, email, password, firstName, lastName);
        this.customers = new ArrayList<>();
    }
    
    public Sales(String email, String password, String firstName, String lastName) {
        super(email, password, firstName, lastName);
        this.customers = new ArrayList<>();
    }
    
    // Getters
    public ArrayList<Customer> getCustomers() {
        return customers;
    }
    
    // Setters
    public void setCustomers(ArrayList<Customer> customers) {
        this.customers = customers;
    }

    
}