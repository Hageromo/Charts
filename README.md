List of endpoints:

http://localhost:8080/rest/all      Returns all users
http://localhost:8080/rest/{user}/{password}   Returns user

http://localhost:8080/rest/add      Add new user to database
http://localhost:8080/rest/add/incomes/{user}   Add incomes to user
http://localhost:8080/rest/add/outcomes/{user}  Add outcomes to user

http://localhost:8080/rest/delete/{user}        Delete user form database
http://localhost:8080/rest/update/out/{user}/{id}   Update user's outcomes by id
http://localhost:8080/rest/update/in/{user}/{id}    Update user's incomes by id
http://localhost:8080/rest/delete/in/{users}/{id}   Delete user's incomes by id
http://localhost:8080/rest/delete/out/{users}/{id}  Delete user's outcomes by id

http://localhost:8080/rest/{user}/in?date=    Returns user's incomes by date
http://localhost:8080/rest/{user}/out?date=    Returns user's outcomes by date
http://localhost:8080/rest/{user}/out/month?date=    Returns user's outcomes by month
http://localhost:8080/rest/{user}/in/momth?date=    Returns user's incomes by month
http://localhost:8080/rest/{user}/in/year?date=    Returns user's incomes by year
http://localhost:8080/rest/{user}/out/year?date=    Returns user's outcomes by year


http://localhost:8080/rest/{user}/incomes               Returns sum of user's incomes
http://localhost:8080/rest/{user}/outcomes              Returns sum of user's outcomes
http://localhost:8080/rest/{user}/incomes/month?date=    Returns sum of user's incomes in month
http://localhost:8080/rest/{user}/outcomes/month?date=    Returns sum of user's outcomes on month
http://localhost:8080/rest/{user}/incomes/year?date=    Returns sum of user's incomes in year
http://localhost:8080/rest/{user}/outcomes/year?date=    Returns sum of user's outcomes on year

http://localhost:8080/rest/{user}/unique/incomes   Returns unique incomes and sum duplicates and returns them as one unique value
http://localhost:8080/rest/{user}/unique/outcomes   Returns unique outcomes and sum duplicates and returns them as one unique value

http://localhost:8080/rest/{user}/incomes/all   Returns list of incomes
http://localhost:8080/rest/{user}/outcomes/all   Returns list of outcomes

http://localhost:8080/rest/{user}/incomes/{id}   Returns income by id
http://localhost:8080/rest/{user}/outcomes/{id}   Returns outcome by id

http://localhost:8080/rest/date/{user}/incomes/up  Returns incomes by date in order
http://localhost:8080/rest/date/{user}/incomes/down   Returns incomes by date in reversed order
http://localhost:8080/rest/date/{user}/outcomes/up   Returns outcomes by date in order
http://localhost:8080/rest/date/{user}/outcomes/down   Returns outcomes by date in reversed order

http://localhost:8080/rest/{user}/in/exact?dataSince=...&dateTo=...     Returns user's incomes by exact date
http://localhost:8080/rest/{user}/out/exact?dataSince=...&dateTo=...    Returns user's outcomes by exact date

