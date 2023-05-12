import requests
import json
from dotenv import load_dotenv
import os
### CREATE AN ARRAY OF TEST FILES ###


class REST_WEB3():

    def __init__(self, endpoint="https://api.web3.storage"):
        load_dotenv()
        BEARER = os.getenv('BEARER')

        self.endpoint = endpoint
        self.bearer = BEARER

    def addFileToIPFS(self, file_data, file_name=None):
       import urllib
       if file_name is None:
           file_name = "file"
       encoded_name = urllib.parse.quote(file_name)
    
       headers = {
           'accept': 'application/json',
           'Authorization': 'Bearer ' + self.bearer,
           "X-NAME": encoded_name,
       }
    
       files = {'file': (file_name, file_data, 'application/octet-stream')}
    
       response = requests.post(self.endpoint+"/upload", headers=headers, files=files)
       return response.json()
    
    def getFileStatus(self, cid):
        headers = {
            'accept': 'application/json',
        }

        response = requests.get(self.endpoint+"/status/"+cid, headers=headers)
        # ret = {'cid': 'bafkreidivzimqfqtoqxkrpge6bjyhlvxqs3rhe73owtmdulaxr5do5in7u', 'dagSize': 6423, 'created': '2023-02-22T11:29:20.79+00:00', 'pins': [{'status': 'Pinned', 'updated': '2023-02-22T12:45:18.271+00:00', 'peerId': 'bafzbeibhqavlasjc7dvbiopygwncnrtvjd2xmryk5laib7zyjor6kf3avm', 'peerName': 'elastic-ipfs', 'region':
                                                                                                                                                        #    None}], 'deals': []}
        return response.json()
        

    def getAllFiles(self):
        import json
        headers = {
            'accept': 'application/vnd.ipld.car',
            'Authorization': 'Bearer ' + self.bearer,
        }

        response = requests.get(self.endpoint+"/user/uploads", headers=headers)
        return response.json()

    def getCAR(self,cid):
        
        headers = {
            'accept': 'image/png',
            
        }
        url = self.endpoint+"/car/"+cid+"?archive=true"
        # print(url)
        response = requests.get(url, headers= headers)
        
        return response.content
    

    def getUserUploads(self,cid):
        headers = {
            'accept': 'application/json', 
            'Authorization': 'Bearer ' + self.bearer,
        }
        response = requests.get(self.endpoint+"/user/uploads/"+cid, headers= headers)
        # https://api.web3.storage/user/uploads/{cid}
        
        return response.json()
    
    
    # def delete_file_from_ipfs(self,cid):
    #     headers = {
    #         'Authorization': 'Bearer ' + self.bearer,
    #     }
        
    #     response = requests.delete(self.endpoint+"/ipfs/"+cid)
    #     return response
    
    
    def writeCar(self,filename,content):
        with open(filename, "wb") as f:
            f.write(content)
        
        
        
if __name__ == '__main__':
    rest = REST_WEB3()
    c = rest.getAllFiles()
    print(c)
