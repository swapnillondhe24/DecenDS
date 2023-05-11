### /register 
payload - 
{
    "username":"<Username>",
    "password":"<Password>",
    "email":"<User-Email>"
}

return - 

if success - 
{
    'message': 'User registered successfully'

}

if failure - 
{
    'message': 'User already exist'

}


### /login
payload - 
{
    "username":"<Username>",
    "password":"<Password>",
}

return - 

if success : 
{
    "token" : "<JWT>"
}

if failure : 
{
    'message': 'Invalid username or password'
}

### /dashboard

return : 
{
    'message': f'Hello, {current_user["username"]}!'
}