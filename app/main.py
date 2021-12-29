from flask import Flask, render_template
from flask import jsonify
from flask import request
from flask_cors import CORS
 
app = Flask(__name__)
CORS(app)

@app.route("/")
def home_view():
        return "<h1>Welcome to Geeks for Geeks</h1>"

@app.route("/add")
def add():
    a = request.args.get('a')
    b = request.args.get('b')
    return jsonify({"result": a+b})