# POST  /register 

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



############################################################################################




#  POST /login
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


############################################################################################

# POST /android_auth
##### payload - 

{

    "username" : "<username>",
    "peerId" : "<peerId>"

}

return - 
if success

{

    'token':"<JWT>"

}

if failure

{

    {
        
        'message': 'Invalid username or PeerID'
        
    }

}

############################################################################################

# POST /dashboard
header 
{

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

############################################################################################
# POST /upload_file
header 
{

    Authorization : "JWT"

}

##### payload - 

form = 

{

    "name":"<Name of file>"

}
files = 
{

    "file" : "<file>"

}

##### return - 

if success
 
    {
 
  "message": "File uploaded successfully",
  "web3": {
    "carCid": "bagbaieraltz6ftjtgbdxdy72qxydgiaomvucnz2eczklodavh5fzfpe5ecyq",
    "cid": "bafkreigflrz6mblkeap7ntq6hqgcdves77erydzuvetdtxsodz3sapfr6q"
  }

}

if failure - 

{

    "message":"No file Selected"

}


############################################################################################

# POST /download_file
header 
{

    Authorization : "JWT"

}

#### payload 

{

    "cid":"<cid>"

}

return

if success 

{

    {"url": strng}  //open the link in __blank tab eg. : ``` <a href="http://your-api-url.com/download/file.pdf" download>Download File</a>```

}

if failure:

{
  
    'message': 'Invalid Credentials'
    
    }


############################################################################################
# POST /onboarding
header 

{

    Authorization : "JWT"

}

##### payload - 
json - 

{

    "storageRented":"<size in MB>"

}

##### return - 

if success - 

{

    'message': <username> has been onboarded! with <storage_rented> GB of storage'

}



############################################################################################

# POST /get_file_list

header 

{

    "Authorization" : "<JWT>"

}

return - 

if success 


{

    <json of file names>

}

if failure -


{

    {

        'message': 'Invalid Credentials'


    }

}