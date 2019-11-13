#!/usr/bin/env python3

# app.py
import socket
from flask import Flask, render_template, request, url_for           # import flask
app = Flask(__name__)             # create an app instance


s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.connect(('8.8.8.8', 1))  # connect() for UDP doesn't send packets
local_ip_address = s.getsockname()[0]
print(local_ip_address)


def drink(button):
    print("{} was pressed.".format(button))

# Method to react to a slider change.
'''@app.route("/test", methods=["POST"])
def test():
    name_of_slider = request.form["name_of_slider"]
    print( name_of_slider)
    return render_template('index.html')'''

@app.route("/", methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        drink(request.form['submit_button'])
    else:
        pass
    return render_template('index.html')


def main():
    app.run(debug=True, host=local_ip_address)                     # run the flask app


main()