package se.hiq.feedbaq;

public class Customer {
    
    // Attributes
    private long id;
    private String name;

    // Constructors
    public Customer() {}
    
    public Customer(long id, String name) {
        this.id = id;
        this.name = name;
    }
    
    public Customer(String name) {
        this.name = name;
    }
    
    // Getters
    public long getId() {
        return id;
    }
    
    public String getName() {
        return name;
    }
    
    // Setters
    public void setId(long id) {
        this.id = id;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    // Methods
    public String toString() {
        return "Customer [id=" + id + ", name=" + name + "]";
    }

}