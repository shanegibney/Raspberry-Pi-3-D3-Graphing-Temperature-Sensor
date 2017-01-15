# /opt/nodeserver/expressTempApp/tempApp/public/python/temperatureDailyAverages.py
# crontab -e  # runs this file every day at midnight 00:00
# m h  dom mon dow   command
# */5 * * * * python /opt/nodeserver/expressTempApp/tempApp/public/python/temperature.py # At every 5th minute
# 1 */1 * * * python /opt/nodeserver/expressTempApp/tempApp/public/python/temperatureHourlyAverages.py # At minute 1 past every hour
# 2 0 */1 * * python /opt/nodeserver/expressTempApp/tempApp/public/python/temperatureDailyAverages.py # At minute 2 on every day-of-month
# https://crontab.guru

# Reads /opt/nodeserver/expressTempApp/tempApp/public/data/data.json file
# Calculates average reading from last 24 hours
# Appends a reading and removes earliest reading, only ever 30 readings allowed
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
for i in range(0,len(data[1]["hourlyAverages"])):
    sum = sum + float(data[1]["hourlyAverages"][i]["temp"])

average = sum/len(data[1]["hourlyAverages"]) #this is the average reading from the previous 30 readings taken every hour
temp =  round(average, 2)

data[2]["dailyAverages"].append({"date": str(now),"temp": str(temp)})

while len(data[2]["dailyAverages"]) > 30:
    del data[2]["dailyAverages"][0]

with open('/opt/nodeserver/expressTempApp/tempApp/public/data/data.json', 'w') as f:
    json.dump(data, f)
