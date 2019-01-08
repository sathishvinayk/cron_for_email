#!/usr/bin/python
from subprocess import call
import schedule
import time

def job():
    print("I'm working!")
    call(["node", "index.js"])
    
schedule.every().day.at("09:30").do(job)

while 1:
    schedule.run_pending()
    time.sleep(1)