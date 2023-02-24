import requests
import json
### CREATE AN ARRAY OF TEST FILES ###
files = {
    'file': 'myNFT.png'
}

class REST_IPFS():
    
    def __init__(self, projectId, projectSecret, endpoint="https://ipfs.infura.io:5001"):
        self.projectId = projectId
        self.projectSecret = projectSecret
        self.endpoint = endpoint

    def addFileToIPFS(self,file):
        response = requests.post(self.endpoint + '/api/v0/add', files=file, auth=(self.projectId, self.projectSecret))
        hash = response.text.split(",")[1].split(":")[1].replace('"','')
        ret = [response, hash]
        return json.dumps(ret,indent=4)


    def readFileFromIPFS(self,hash):
        response = requests.post(self.endpoint + '/api/v0/cat', params=hash, auth=(self.projectId, self.projectSecret))
        ret = [response, response.text]
        return json.dumps(ret,indent=4)


    def removeFileFromIPFS(self,hash):
        response = requests.post(self.endpoint + '/api/v0/pin/rm', params=hash, auth=(self.projectId, self.projectSecret))
        ret = [response, response.json()]
        return json.dumps(ret,indent=4)
    
    
