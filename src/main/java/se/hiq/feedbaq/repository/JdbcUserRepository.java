package se.hiq.feedbaq;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

public class JdbcUserRepository implements UserRepository {
  
  @Autowired
  private JdbcTemplate jdbcTemplate;
  
  @Override
  public int save(User user) {
    return jdbcTemplate.update("INSERT INTO users (email, password, firstName, lastName) VALUES(?,?,?,?)",
      new Object[] { user.getEmail(), user.getPassword(), user.getFirstName(), user.getLastName() });
  }
  
  @Override
  public int update(User user) {
    return jdbcTemplate.update("UPDATE users SET email=?, password=?, firstName=?, lastName=? WHERE id=?",
      new Object[] { user.getEmail(), user.getPassword(), user.getFirstName(), user.getLastName() });
  }
  
  @Override
  public User findById(long id) {
    try {
      User user = jdbcTemplate.queryForObject("SELECT * FROM users WHERE id=?", 
        BeanPropertyRowMapper.newInstance(User.class), id);
      return user;
    } catch (IncorrectResultSizeDataAccessException e) {
      return null;
    }
  }
  
  @Override
  public int deleteById(long id) {
    return jdbcTemplate.update("DELETE FROM users WHERE id=?", id);
  }
  
  @Override
  public List<User> findAll() {
    return jdbcTemplate.query("SELECT * from users", BeanPropertyRowMapper.newInstance(User.class));
  }
  
  @Override
  public int deleteAll() {
    return jdbcTemplate.update("DELETE from users");
  }

}