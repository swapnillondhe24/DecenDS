### POST  /register 

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


###  POST /login
payload - 
{
    "username":"<Username>",
    "password":"<Password>",
}

##### return - 

if success : 
{
    "token" : "<JWT>"
}

if failure : 
{
    'message': 'Invalid username or password'
}



### POST /android_auth
##### payload - 
{
    "username" : "<username>",
    "peerId" : "<peerId>"
}

### POST /dashboard
header {
    Authorization : "JWT"
}

##### return : 
{
    "username": "<Username>",
    "peerId": "<peerID>",
    "storage_rented": "<number>",
    "coins_earned": "<float>",
    "bandwidth_used": "<number>",
    "data_uploaded":  "<number>",
    "data_downloaded":  "<number>",
    "space_used": "<number>"
}


### POST /upload_file
header {
    Authorization : "JWT"
}

##### payload - 

form-data = {
    "name":"<Name of file>"
    "file": "file-data"
}

##### return - 

if success
    {
        "message":"file uploaded Sucess"
    }

if failure - 
{
    "message":"No file Selected"
}




### POST /onboarding
header {
    Authorization : "JWT"
}

##### payload - 
json - {
    "storageRented":"<size in MB>"
}

##### return - 

if success - 
{
    'message': <username> has been onboarded! with <storage_rented> GB of storage'
}
