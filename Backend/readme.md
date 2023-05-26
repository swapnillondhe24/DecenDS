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

    {"url": strng}  //open the link in __blank tab eg. : ``` <a href="{strng}f" download>Download File</a>```

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



######################################################

# POST /active_time

header 

{

    "Authorization" : "<JWT>"

}
payload - 


{
    'active_time':active_time
}

return - 

if success 


{

    {
        
        'message': <username> active time has been updated!'
        
        }

}

if failure -


{

    

        {
            
            'message': 'Missing active_time field in request body'
            
        }

}

if Internal Server Error - 

{

    {

        'message':'Error Occured while updating active time'

    }


}




# POST /send_reset_email

payload - 
{
    "email": "<User Email>"
}


if email do not exist : 
{"status":"failure","message":'Email not found, Please register first'}

if mail sending failed :
"status":"failure","message":'Unable to send otp at this time, Please try again later'}


if mail sending success : 
{"status":"success","message":'Email sent successfully'}



# POST /verify_otp

payload - 
{
  "email":"<email>",
  "otp":"<otp>",
  "password":"<password>"
}


if email do not exist in request : 

{

    "status":"failure",

    "message":'Email not found'
    

}

if email do not exist in database  : 

{

    "status":"failure",

    "message":'User email or username incorrect or does not exist'
    

}

if otp do not exist in request : 

{

    "status":"failure",

    "message":'otp not found'
    

}

if password do not exist in request : 

{

    "status":"failure",

    "message":'password not found'
    

}


if OTP Auth success :

{
    "status":"Passed",
    "Message":"OTP verification successfully"
}

if OTP Auth Failute :

{
    "status":"Passed",
    "Message":"OTP verification Failed"
}



