package se.hiq.feedbaq;

public class User {
    
    // Attributes
    private long id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    
    // Constructors
    public User() {}
    
    public User(long id, String email, String password, String firstName, String lastName) {
        this.id = id;
        this.email = email;
        this.password = password; // KRYPTERING, HUR???
        this.firstName = firstName;
        this.lastName = lastName;
    }
    
    public User(String email, String password, String firstName, String lastName) {
        this.email = email;
        this.password = password; // KRYPTERING, HUR???
        this.firstName = firstName;
        this.lastName = lastName;
    }
    
    // Getters
    public long getId() {
        return id;
    }
    
    public String getEmail() {
        return email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public String getFirstName() {
        return firstName;
    }
    
    public String getLastName() {
        return lastName;
    }
    
     // Setters
    public void setId(long id){
        this.id = id;
    }
    
    public void setEmail(String email){
        this.email = email;
    }

    public void setPassword(String password){
        this.password = password;
    }
    
    public void setFirstName(String firstName) {
        this.firstName = firstName; 
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    // Methods 
    public String toString() {
        return "User [id=" + id + ", email=" + email + ", password=" + password + ", firstName=" + firstName + ", lastName=" + lastName + "]";
    }
    
}