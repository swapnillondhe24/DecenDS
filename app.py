from flask import Flask, jsonify
from flask import request,Response
from flask_restful import Resource, Api



api = ''
app = Flask(__name__)
api = Api(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_HEADERS'] = 'Content-Type'


class getstats(Resource):
               
    def post(self):
        try:
            request_json = request.get_json()
            return Response(request_json, mimetype="text/event-stream")
            # return Response(request_json)
        except Exception as error:
            print(error)
            
api.add_resource(getstats, '/getstats/')



if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5006)
    app.run(debug=False)