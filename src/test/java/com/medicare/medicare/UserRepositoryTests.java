package com.medicare.medicare;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;

import com.medicare.medicare.entity.User;
import com.medicare.medicare.repository.UserRepository;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
public class UserRepositoryTests {

    @Autowired
    private UserRepository repo;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    public void testCreateUser () {
        User user =  new User();

        user.setEmail("test@gmail.com");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setPassword("Pass1234");

        User savedUser = repo.save(user);

        User existingUser = entityManager.find(User.class, savedUser.getId());

        assertThat(existingUser.getEmail()).isEqualTo(user.getEmail());

    }

    @Test
    public void testFindUserByEmail() {
        String email = "test@gmail.com";

        Optional<User> foundUser = repo.findByEmail(email);

        assertThat(foundUser).isNotNull();
    }
}