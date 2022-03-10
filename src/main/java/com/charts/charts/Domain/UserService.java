package com.charts.charts.Domain;

import com.charts.charts.Controller.Incomes;
import com.charts.charts.Controller.Outcomes;
import com.charts.charts.Controller.User;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {


    private final UserRepository userRepository;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User addUser(User user){
        return userRepository.save(new User(user.getUserName(), user.getPassword(), user.getEmail()));
    }

    public User addIncomes(Incomes datas, User user){

        if(user.getIncomes() == null){
            datas.setId(0);
        }else{

            int max = user.getIncomes().stream().max(Comparator.comparing(Incomes::getId)).orElseThrow(NoSuchElementException::new).getId();
            datas.setId(max + 1);
        }

        ArrayList<Incomes> incomes = new ArrayList<>();
        incomes.add(datas);

        if(user.getIncomes().isEmpty()){
            user.setIncomes(incomes);
        }else{
            user.getIncomes().add(user.getIncomes().size(), datas);
        }

        return userRepository.save(user);
    }

    public User addOutcomes(Outcomes datas, User user){

        if(user.getOutcomes().isEmpty()){
            datas.setId(0);
        }else{
            int max = user.getOutcomes().stream().max(Comparator.comparing(Outcomes::getId)).orElseThrow(NoSuchElementException::new).getId();
            datas.setId(max + 1);
        }

        ArrayList<Outcomes> outcomes = new ArrayList<>();
        outcomes.add(datas);

        if(user.getOutcomes() == null){
            user.setOutcomes(outcomes);
        }else{
            user.getOutcomes().add(user.getOutcomes().size(),datas);
        }

        return userRepository.save(user);
    }

    public User updateUserOutcomes(User user, Outcomes datas, int id){

        datas.setId(id);
        ArrayList<Outcomes> outcomes = new ArrayList<>();
        outcomes.add(datas);

        user.getOutcomes().remove(user.getOutcomes().stream()
                .filter(index -> index.getId() == id)
                .findAny()
                .orElse(null));


        if(user.getOutcomes() == null){
            user.setOutcomes(outcomes);
        }else{
            user.getOutcomes().add(user.getOutcomes().size(),datas);
        }

        return userRepository.save(user);
    }

    public User updateUserIncomes(User user, Incomes datas, int id){

        datas.setId(id);
        ArrayList<Incomes> incomes = new ArrayList<>();
        incomes.add(datas);

        user.getIncomes().remove(user.getIncomes().stream()
                .filter(index -> index.getId() == id)
                .findAny()
                .orElse(null));

        if(user.getIncomes() == null){
            user.setIncomes(incomes);
        }else{
            user.getIncomes().add(user.getIncomes().size(),datas);
        }

        return userRepository.save(user);
    }


    public User deleteIncomes(User user, int id){

        user.getIncomes().remove(user.getIncomes().stream()
                .filter(index -> index.getId() == id)
                .findAny()
                .orElse(null));

        return userRepository.save(user);
    }

    public User deleteOutcomes(User user, int id){

        user.getOutcomes().remove(user.getOutcomes().stream()
                .filter(index -> index.getId() == id)
                .findAny()
                .orElse(null));

        return userRepository.save(user);
    }

    public List<Incomes> findIncomesByDay(User user, LocalDate date){

        List<Incomes> incomes = user.getIncomes().stream()
                .filter(day -> day.getDate().equals(date)).collect(Collectors.toList());

        return incomes;
    }


    public List<Outcomes> findOutcomesByDay(User user, LocalDate date){

        List<Outcomes> outcomes = user.getOutcomes().stream()
                .filter(day -> day.getDate().equals(date)).collect(Collectors.toList());

        return outcomes;
    }

    public BigDecimal sumOfIncomes(User user){

        BigDecimal sumOfIncomes = user.getIncomes().stream()
                .map(Incomes::getValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);


        return sumOfIncomes;
    }

    public BigDecimal sumOfOutcomes(User user){

        BigDecimal sumOfOutcomes = user.getOutcomes().stream()
                .map(Outcomes::getValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return sumOfOutcomes;
    }

    public List<Outcomes> findOutcomesByMonth(User user, LocalDate date){

        List<Outcomes> outcomes = user.getOutcomes().stream()
                .filter(day -> day.getDate().getMonth().equals(date.getMonth()))
                .filter(day -> day.getDate().getYear() == date.getYear())
                .collect(Collectors.toList());

        return outcomes;
    }

    public List<Incomes> findIncomesByMonth(User user, LocalDate date){

        List<Incomes> incomes = user.getIncomes().stream()
                .filter(day -> day.getDate().getMonth().equals(date.getMonth()))
                .filter(day -> day.getDate().getYear() == date.getYear())
                .collect(Collectors.toList());

        return incomes;
    }

    public List<Outcomes> findOutcomesByYear(User user, LocalDate date){

        List<Outcomes> outcomes = user.getOutcomes().stream()
                .filter(day -> day.getDate().getYear() == date.getYear())
                .collect(Collectors.toList());

        return outcomes;
    }

    public List<Incomes> findIncomesByYear(User user, LocalDate date){

        List<Incomes> incomes = user.getIncomes().stream()
                .filter(day -> day.getDate().getYear() == date.getYear())
                .collect(Collectors.toList());

        return incomes;
    }

    public BigDecimal sumOutcomesByMonth(User user, LocalDate date){
        List<Outcomes> outcomesByMonth = findOutcomesByMonth(user, date);

        BigDecimal sumOutcomesByMonth = outcomesByMonth.stream()
                .map(Outcomes::getValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return sumOutcomesByMonth;
    }

    public BigDecimal sumIncomesByMonth(User user, LocalDate date){
        List<Incomes> incomesByMonth = findIncomesByMonth(user, date);

        BigDecimal sumIncomesByMonth = incomesByMonth.stream()
                .map(Incomes::getValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return sumIncomesByMonth;
    }

    public BigDecimal sumIncomesByYear(User user, LocalDate date){
        List<Incomes> incomesByYear = findIncomesByYear(user, date);

        BigDecimal sumIncomesByYear = incomesByYear.stream()
                .map(Incomes::getValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return sumIncomesByYear;
    }

    public BigDecimal sumOutcomesByYear(User user, LocalDate date){
        List<Outcomes> outcomesByYear = findOutcomesByYear(user, date);

        BigDecimal sumOutcomesByYear = outcomesByYear.stream()
                .map(Outcomes::getValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return sumOutcomesByYear;
    }

    public Map<String, BigDecimal> uniqueIncomes(User user, LocalDate date){
        List<Incomes> incomesByMonth = findIncomesByMonth(user, date);

        Map<String, BigDecimal> unique = incomesByMonth.stream()
                .collect(Collectors.toMap(
                   Incomes::getIncomes,
                   Incomes::getValue,
                   BigDecimal::add
                ));

        return unique;
    }

    public Map<String, BigDecimal> uniqueOutcomes(User user, LocalDate date){
        List<Outcomes> outcomesByMonth = findOutcomesByMonth(user, date);

        Map<String, BigDecimal> unique = outcomesByMonth.stream()
                .collect(Collectors.toMap(
                        Outcomes::getOutcomes,
                        Outcomes::getValue,
                        BigDecimal::add
                ));

        return unique;
    }

    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User foundedUser = userRepository.findByUserName(username);
        if(foundedUser == null) {
            return null;
        }
        String userName = foundedUser.getUserName();
        String password = foundedUser.getPassword();

        return new org.springframework.security.core.userdetails.User(userName, password, new ArrayList<>());
    }
}
