package se.hiq.feedbaq;

import java.util.List;

public interface UserRepository {
  
  int save(User user);

  int update(User user);

  User findById(long id);

  int deleteById(long id);

  List<User> findAll();

  int deleteAll();
  
}