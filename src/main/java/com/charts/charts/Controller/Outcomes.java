package com.charts.charts.Controller;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;

@Data public class Outcomes {

    private int id;
    private LocalDate date;
    private HashMap<String, BigDecimal> outcomes;


    public Outcomes(LocalDate date, HashMap<String, BigDecimal> outcomes) {
        this.date = date;
        this.outcomes = outcomes;
    }
}
