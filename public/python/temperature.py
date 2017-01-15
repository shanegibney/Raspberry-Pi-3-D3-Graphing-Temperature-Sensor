
# /opt/nodeserver/expressTempApp/tempApp/public/python/temperature.py
# crontab -e runs this file every 5 minutes
# m h  dom mon dow   command
# */5 * * * * python /opt/nodeserver/expressTempApp/tempApp/public/python/temperature.py # At every 5th minute
# 1 */1 * * * python /opt/nodeserver/expressTempApp/tempApp/public/python/temperatureHourlyAverages.py # At minute 1 past every hour
# 2 0 */1 * * python /opt/nodeserver/expressTempApp/tempApp/public/python/temperatureDailyAverages.py # At minute 2 on every day-of-month
# https://crontab.guru

# Reads temperature from sensor
# Reads /opt/nodeserver/expressTempApp/tempApp/public/data/data.json file
# Appends a reading and removes earliest reading, only ever 13 readings allowed
# Dumps data back into /opt/nodeserver/expressTempApp/tempApp/public/data/data.json

import os
from decimal import Decimal
import json
import datetime
import time

now = datetime.datetime.now()

# Open the file that we viewed earlier so that python can see what is in it. Replace the serial number as before.
tfile = open("/sys/bus/w1/devices/28-000006c87ee2/w1_slave")
# Read all of the text in the file.
text = tfile.read()
# Close the file now that the text has been read.
tfile.close()
# Split the text with new lines (\n) and select the second line.
secondline = text.split("\n")[1]
# Split the line into words, referring to the spaces, and select the 10th word (counting from 0).
temperaturedata = secondline.split(" ")[9]
# The first two characters are "t=", so get rid of those and convert the temperature from a string to a number.
temperature = Decimal(temperaturedata[2:])
# Put the decimal point in the right place and display it.
temp = temperature/1000
with open('/opt/nodeserver/expressTempApp/tempApp/public/data/data.json', 'r') as f:
    data = json.load(f)
# /opt/nodeserver/expressTempApp/tempApp/public/data

data[0]["fiveMinReadings"].append({"temp": str(temp), "date": str(now)})

while len(data[0]["fiveMinReadings"]) > 13:
    del data[0]["fiveMinReadings"][0]

with open('/opt/nodeserver/expressTempApp/tempApp/public/data/data.json', 'w') as f:
    json.dump(data, f)

