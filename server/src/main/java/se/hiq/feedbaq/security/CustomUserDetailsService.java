package se.hiq.feedbaq.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        try {

            String sql = "SELECT * FROM users WHERE email=?";
            Map<String, Object> user = jdbcTemplate.queryForMap(sql, username);
            
            String email = user.get("email").toString();
            String password = user.get("password").toString();
            String role = user.get("role").toString();
            List<String> roles = new ArrayList<>();
            roles.add(role);

            return new User(email, password, mapRolesToAuthorities(roles));
        } catch (IncorrectResultSizeDataAccessException e) {
            throw new UsernameNotFoundException("User with email " + username + " not found");
        }
    }


    private Collection<GrantedAuthority> mapRolesToAuthorities(List<String> roles) {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role)).collect(Collectors.toList());
    }
    
}
