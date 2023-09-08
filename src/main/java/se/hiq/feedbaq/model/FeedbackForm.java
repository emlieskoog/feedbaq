package se.hiq.feedbaq;

import java.time.LocalDate;

public class FeedbackForm {
    
    // Attributes
    private long id;
    private boolean isPublished;
    private long consultantId;
    private long customerId;
    private long managerId;
    private long salesId;
    private LocalDate date;
    
    // Constructors
    public FeedbackForm() {}
    
    public FeedbackForm(
        long id, boolean isPublished, long consultantId, 
        long customerId, long managerId, long salesId, LocalDate date
    ) {
        this.id = id;
        this.isPublished = isPublished;
        this.consultantId = consultantId;
        this.customerId = customerId;
        this.managerId = managerId;
        this.salesId = salesId;
        this.date = date;
    }
    
    public FeedbackForm(
        boolean isPublished, long consultantId, long customerId,
        long managerId, long salesId, LocalDate date
    ) {
        this.isPublished = isPublished;
        this.consultantId = consultantId;
        this.customerId = customerId;
        this.managerId = managerId;
        this.salesId = salesId;
        this.date = date;
    }
    
    // Getters
    public boolean getIsPublished() {
        return isPublished;
    }
    
    public long getConsultantId() {
        return consultantId;
    }
    
    public long getCustomerId() {
        return customerId;
    }
    
    public long getManagerId() {
        return managerId;
    }
    
    public long getSalesId() {
        return salesId;
    }
    
    public LocalDate getDate() {
        return date;
    }
    
    // Setters
    public void setIsPublished(boolean isPublished){
        this.isPublished = isPublished;
    }
    
    public void setConsultantId(long consultantId){
        this.consultantId = consultantId;
    }
    
    public void setCustomerId(long customerId){
        this.customerId = customerId;
    }
    
    public void setManagerId(long managerId){
        this.managerId = managerId;
    }
        
    public void setSalesId(long salesId){
        this.salesId = salesId;
    }
    
    public void setDate(LocalDate date) {
        this.date = date;
    }
    
    // Methods...
    
}