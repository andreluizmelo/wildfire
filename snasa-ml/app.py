from flask import Flask, request
import requests as r
import json
from sklearn import datasets
import pickle
import sys

app = Flask(__name__)


# @app.route('/')
# def hello():
#     return "Hello World!"

model = pickle.load(open( "model", "rb" ))

def dangerlevel(level):
    if level == 0:
        return 'low'
    elif level == 1:
        return 'moderate'
    else:
        return 'high'

def isdanger(weather):
    print([ weather['wind'] , weather['pressure'], weather['temperature']], file=sys.stderr)
    prediction = model.predict([[weather['wind'] , weather['pressure'], weather['temperature']]])
    print(prediction, file=sys.stderr)
    print( prediction[0], file=sys.stderr)
    return dangerlevel(prediction[0])
    #return weather['temperature'] > 122 or weather['humidity'] < 10 or (weather['humidity'] < 20 and weather['wind' > 5])

@app.route('/')
def amiindanger():
    lat = request.args.get('latitude')
    lon = request.args.get('longitude')

    url= 'http://api.openweathermap.org/data/2.5/weather?lat='+str(lat)+'&lon='+str(lon)+'&APPID=110480bdb477a78ca4279f6c1cc1e97d'
    print(url)
    req = r.get(url)

    if req.status_code == 200:
        req_json = req.json()

        weather = {
            'temperature': (req_json['main']['temp'] - 273.15) * 9.0 / 5 + 32,
            'humidity': req_json['main']['humidity'],
            'pressure': req_json['main']['pressure'],
            'wind': req_json['wind']['speed']
        }
        weather['danger'] = isdanger(weather)
        return json.dumps(weather)
    else:
        print('erro')
        return json.dumps({ "error": 'erro!' }), 500

if __name__ == '__main__':
    app.run()