package com.charts.charts.Controller;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data public class Outcomes {

    private int id;
    private LocalDate date;
    private String outcomes;
    private BigDecimal value;


    public Outcomes(LocalDate date, String outcomes, BigDecimal value) {
        this.date = date;
        this.outcomes = outcomes;
        this.value = value;
    }
}
