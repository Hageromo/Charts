package com.charts.charts.Domain;

import com.charts.charts.Controller.Incomes;
import com.charts.charts.Controller.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findByUserName(String userName);

    @Query("{'Incomes.date':?0}")
    List<Incomes> findByUserNameAndDate(LocalDate date);
}
