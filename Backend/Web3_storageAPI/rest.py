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

    def addFileToIPFS(self, file="D:/logo.png"):
        headers = {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + self.bearer,
        }

        files = {'file': ('logo.png', open(file, 'rb'), 'image/png')}

        response = requests.post(self.endpoint+"/upload", headers=headers, files=files)
        return response.json()
        # ret = {'cid': 'bafkreigfqz72rjb5smbr22hns5aynts7c26feavqviqbazq6d6gphsamca',
            #    'carCid': 'bagbaieraeu3iuppk2gnjkiopxp45lqzidecs676w6yjgyzujbmetzvrfhfqa'}

        # return ret

    def getFileStatus(self, cid):
        headers = {
            'accept': 'application/json',
        }

        response = requests.get(self.endpoint+"/status/"+cid, headers=headers)
        # ret = {'cid': 'bafkreidivzimqfqtoqxkrpge6bjyhlvxqs3rhe73owtmdulaxr5do5in7u', 'dagSize': 6423, 'created': '2023-02-22T11:29:20.79+00:00', 'pins': [{'status': 'Pinned', 'updated': '2023-02-22T12:45:18.271+00:00', 'peerId': 'bafzbeibhqavlasjc7dvbiopygwncnrtvjd2xmryk5laib7zyjor6kf3avm', 'peerName': 'elastic-ipfs', 'region':
                                                                                                                                                        #    None}], 'deals': []}
        return response.json()
        return ret

    def getAllFiles(self):
        headers = {
            'accept': 'application/vnd.ipld.car',
            'Authorization': 'Bearer ' + self.bearer,
        }

        response = requests.get(self.endpoint+"/user/uploads", headers=headers)
        return response.json(indent=4)

    def getCAR(self,cid):
        headers = {
            'accept': 'image/png',
            
        }
        url = self.endpoint+"/car/"+cid
        print(url)
        response = requests.get(url, headers= headers)
        
        json{
            "name":"logo.png",
            "blob":response.content
        },200
        
        # print(response.text)
        return response.content
        
if __name__ == '__main__':
    rest = REST_WEB3()
    c = rest.getAllFiles()
    print(c)
    # c = "bagbaieraeu3iuppk2gnjkiopxp45lqzidecs676w6yjgyzujbmetzvrfhfqa"
    # print(rest.getCAR(c))
