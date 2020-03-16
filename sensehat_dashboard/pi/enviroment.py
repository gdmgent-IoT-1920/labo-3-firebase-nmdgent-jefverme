from sense_hat import SenseHat
import firebase_admin
from firebase_admin import credentials, firestore
import time

print('running')


# firebase
cred = credentials.Certificate("/home/pi/Desktop/labo-3-firebase-nmdgent-jefverme/sensehat_dashboard/config/labo-iot-firebase-adminsdk-c3rpv-23eb19a6ee.json")
firebase_admin.initialize_app(cred)

# sensehat 
sense = SenseHat()
sense.set_imu_config(False, False, False)
sense.clear()

while True:
    print(sense.temperature)
    time.sleep(1)