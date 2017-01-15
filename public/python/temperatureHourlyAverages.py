# /opt/nodeserver/expressTempApp/tempApp/public/python/temperatureHourlyAverages.py
# crontab -e runs this file every hour
# m h  dom mon dow   command
# */5 * * * * python /opt/nodeserver/expressTempApp/tempApp/public/python/temperature.py # At every 5th minute
# 1 */1 * * * python /opt/nodeserver/expressTempApp/tempApp/public/python/temperatureHourlyAverages.py # At minute 1 past every hour
# 2 0 */1 * * python /opt/nodeserver/expressTempApp/tempApp/public/python/temperatureDailyAverages.py # At minute 2 on every day-of-month
# https://crontab.guru

# Reads /opt/nodeserver/expressTempApp/tempApp/public/data/data.json file
# Calculates average reading from last hour
# Appends a reading and removes earliest reading, only ever 25 readings allowed
# Dumps data back into /opt/nodeserver/expressTempApp/tempApp/public/data/data.json

import os
from decimal import Decimal
import json
import datetime
import time

now = datetime.datetime.now()
with open('/opt/nodeserver/expressTempApp/tempApp/public/data/data.json', 'r') as f:
    data = json.load(f)

sum = 0;
for i in range(0,len(data[0]["fiveMinReadings"])):
    sum = sum + float(data[0]["fiveMinReadings"][i]["temp"])

average = sum/len(data[0]["fiveMinReadings"]) #this is the average reading from the previous 13 readings taken every 5 minutes
temp =  round(average, 2)

data[1]["hourlyAverages"].append({"date": str(now),"temp": str(temp)})

while len(data[1]["hourlyAverages"]) > 25:
    del data[1]["hourlyAverages"][0]

with open('/opt/nodeserver/expressTempApp/tempApp/public/data/data.json', 'w') as f:
    json.dump(data, f)
