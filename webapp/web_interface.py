#!/usr/bin/env python3

# app.py
import socket
from flask import Flask, render_template, request, url_for           # import flask
import rospy


class web_interface():
    def __init__(self):
        self.app = Flask(__name__)             # create an app instance

    def drink(self, button):
        print("{} was pressed.".format(button))

    @app.route("/", methods=['POST', 'GET'])
    def index(self):
        if request.method == 'POST':
            self.drink(request.form['submit_button'])
        else:
            pass
        return render_template('index.html')

    def get_ip(self):
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 1))  # connect() for UDP doesn't send packets
        local_ip_address = s.getsockname()[0]
        print(local_ip_address)
        return local_ip_address

    def start(self):
        app.run(debug=True, host=self.get_ip())  # run the flask app


def main():
    init = web_interface()
    init.start()

main()