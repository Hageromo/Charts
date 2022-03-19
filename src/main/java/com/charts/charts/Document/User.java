package com.charts.charts.Document;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Data
@Document
public class User {

    @Id
    private String id;
    @Indexed(unique = true)
    private String userName;
    private String password;
    @Indexed(unique = true)
    private String email;
    private ArrayList<Incomes> incomes;
    private ArrayList<Outcomes> outcomes;

    public User(String userName, String password, String email) {
        this.userName = userName;
        this.password = password;
        this.email = email;
    }

}
