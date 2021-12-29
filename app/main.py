from flask import Flask, render_template
from flask import jsonify
from flask import request
 
app = Flask(__name__)
 
@app.route("/")
def home_view():
        return "<h1>Welcome to Geeks for Geeks</h1>"

@app.route("/add")
def add():
    a = request.args.get('a')
    b = request.args.get('b')
    return jsonify({"result": a+b})