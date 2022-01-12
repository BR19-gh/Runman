from flask import Flask, render_template, jsonify, request, abort
import os
from flask.helpers import send_from_directory
from flask.wrappers import Response
import psycopg2
import psycopg2.extras as ext
from flask_cors import CORS, cross_origin
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

DATABASE_URL = os.environ.get('DATABASE_URL')
BR19_PASSWORD = os.environ.get('BR19_PASSWORD')


app = Flask(__name__, template_folder='templates')
# cors = CORS(app)
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["1 per 30seconds", "50 per hour"]
)


class RecordsTable:

    def __init__(self):
        self.conn = psycopg2.connect(DATABASE_URL, sslmode='require')
        self.cur = self.conn.cursor(cursor_factory=ext.DictCursor)
        self.cur.execute(
            "CREATE TABLE IF NOT EXISTS records (name TEXT NOT NULL,hcoins INTEGER NOT NULL,htime INTEGER NOT NULL)")

    def display(self):
        self.cur.execute("SELECT * FROM records")
        self.records = self.cur.fetchall()
        return self.records

    def search(self, name):
        self.cur.execute(f"SELECT * FROM records WHERE name = '{name}'")
        self.record = self.cur.fetchone()
        return self.record

    def insert(self, name, hcoins, htime):
        if (name == "" or hcoins == "" or htime == ""):
            raise Exception("One of the entries is empty")
        self.cur.execute(f"INSERT INTO records VALUES {(name,hcoins,htime)}")
        self.conn.commit()

    def update(self, name, hcoin, htime):
        self.cur.execute(
            f"UPDATE records SET hcoins = '{hcoin}' WHERE name = '{name}'")
        self.cur.execute(
            f"UPDATE records SET htime = '{htime}' WHERE name = '{name}'")
        self.conn.commit()

    def delete(self, name):
        if (name == None):
            raise Exception("You have to select a name to delete its values")
        self.cur.execute(f"DELETE FROM records WHERE name = '{name}'")
        self.conn.commit()

    def __del__(self):
        self.conn.close()


# routes

# main

@app.route("/")
@limiter.exempt
def home_view():
    return render_template('index.html')


@app.route("/en")
@limiter.exempt
def home_view_en():
    return render_template('index.html')


@app.route("/ar")
@limiter.exempt
def home_view_ar():
    return render_template('indexAr.html')

# Runman


@app.route("/runman")
@limiter.exempt
def home_view_runman():
    return render_template('Runman/index.html')


@app.route("/runman/en")
@limiter.exempt
def home_view_runman_en():
    return render_template('Runman/index.html')


@app.route("/runman/ar")
@limiter.exempt
def home_view_runman_ar():
    return render_template('Runman/indexAr.html')


@app.route("/runman/db")
@limiter.exempt
def home_view_runman_db():
    return render_template('Runman/Dashboard.html')

# DemonsKiller


@app.route("/demonskiller")
@limiter.exempt
def home_view_demonskiller():
    return render_template('DemonsKiller/index.html')


@app.route("/demonskiller/en")
@limiter.exempt
def home_view_demonskiller_en():
    return render_template('DemonsKiller/index.html')


@app.route("/demonskiller/ar")
@limiter.exempt
def home_view_demonskiller_ar():
    return render_template('DemonsKiller/indexAr.html')

# Dagshtick


@app.route("/dagshtick")
@limiter.exempt
def home_view_dagshtick():
    return render_template('Dagshtick/index.html')

# dawrati


@app.route("/dawrati")
@limiter.exempt
def home_view_dawrati():
    return render_template('dawrati/main.html')

# Blogger


@app.route("/blogger")
@limiter.exempt
def home_view_blogger1():
    return render_template('Blogger/login.html')


@app.route("/blogger/home")
@limiter.exempt
def home_view_blogger2():
    return render_template('Blogger/home.html')


@app.route("/blogger/addBlog")
@limiter.exempt
def home_view_blogger3():
    return render_template('Blogger/addBlog.html')

# onethree


@app.route("/onethree")
@limiter.exempt
def home_view_onethree():
    return render_template('onethree/index.html')


# end of routes


# Runman Backend

@app.route("/runman/user", methods=['POST', 'PUT'])
@app.route("/runman/user/<string:nameIn>", methods=['DELETE', 'GET'])
@limiter.limit('1 per 30seconds', per_method=True, methods=['PUT'])
@limiter.limit('1 per 90seconds', per_method=True, methods=['POST', 'DELETE'])
def user(nameIn=None):
    print('The ip address: ', get_remote_address())
    newObj = RecordsTable()

    if request.method == 'POST':

        data = request.get_json()
        name = data['name']
        hcoins = data['hcoins']
        htime = data['htime']

        if " " in name or "\t" in name or f"\n" in name or name == None:
            return jsonify({"msg": f"Invalid input 400: name:{name} contains spaces or invalid characters, therefore player:{name} will not be added", "statCode": 400})
        if int(hcoins) > 100:
            return jsonify({"msg": f"Invalid input 400: hcoins:{hcoins} is too much, therefore player:{name} will not be added", "statCode": 400})
        if int(htime) > 700:
            return jsonify({"msg": f"Invalid input 400: htime:{htime} is too much, therefore player:{name} will not be added", "statCode": 400})

        result = newObj.search(name)
        if result == None:
            pass
        else:
            return jsonify({"msg": f"Error 403: the name {name} already exists", "statCode": 403})

        newObj.insert(name, hcoins, htime)

        recordSearched = newObj.search(name)
        if (recordSearched[0] == name):
            return jsonify({"msg": f"Success 201: player:{name} is recorded, the name matches {(newObj.search(name))[0]}", "statCode": 201})
        else:
            return jsonify({"msg": f"Unkown Error 500: player:{name} was not recorded, the name doesn't match {(newObj.search(name))[0]}", "statCode": 500})

    elif request.method == 'PUT':

        data = request.get_json()
        name = data['name']
        hcoins = data['hcoins']
        htime = data['htime']

        if int(hcoins) > 100:
            return jsonify({"msg": f"Invalid input 400: hcoins:{hcoins} is too much, therefore player:{name} will not be updated", "statCode": 400})
        if int(htime) > 700:
            return jsonify({"msg": f"Invalid input 400: htime:{htime} is too much, therefore player:{name} will not be updated", "statCode": 400})

        oldUserRecord = newObj.search(name)

        newObj.update(name, hcoins, htime)

        recordSearched = newObj.search(name)
        if recordSearched == None:
            return jsonify({"msg": f"Error 404: player:{name} was not updated because they didn't have a record before (maybe first time playing?) ", "statCode": 404})
        elif (recordSearched[0] == name):
            return jsonify({"msg": f"Success 200: player:{name} is updated, old data:{oldUserRecord}, new data:{newObj.search(name)}", "statCode": 200})
        else:
            return jsonify({"msg": f"Unkown Error 500: player:{name} was not updated, old data:{oldUserRecord}, new data:{newObj.search(name)}", "statCode": 500})

    elif request.method == 'GET':

        result = newObj.search(nameIn)

        if result == None:
            return jsonify({"msg": f"Success 202: the name {nameIn} doesn't exists, so it can be added", "statCode": 202})
        else:
            return jsonify({"msg": f"Error 403: the name {nameIn} already exists", "statCode": 403})

    elif request.method == 'DELETE':

        result = newObj.search(nameIn)
        if result == None:
            return jsonify({"msg": f"Error 404: name:{nameIn} was not found, it may doesn't exists", "statCode": 404})

        newObj.delete(nameIn)

        result = newObj.search(nameIn)

        if result == None:
            return jsonify({"msg": f"Success 204: name:{nameIn} is deleted successfully, name:{nameIn} doesn't exists anymore", "statCode": 204})
        else:
            return jsonify({"msg": f"Error 500: failed to delete name:{nameIn}, name:{nameIn} still exists", "statCode": 500})


@app.route("/runman/user/<int:id>", methods=['DELETE'])
@limiter.limit('1 per 90seconds', methods=['DELETE'])
def userDeleteId(id):
    newObj = RecordsTable()

    result = newObj.display()
    resultSorted = sorted(result, key=lambda tup: tup[2], reverse=True)
    dictOfResult = {}
    j = 0
    for i in resultSorted:
        dictOfResult[j] = {'name': i[0], 'hcoins': i[1], 'htime': i[2]}
        j += 1
    name = dictOfResult[id]['name']

    result = newObj.search(name)
    if result == None:
        return jsonify({"msg": f"Error 404: name:{name} was not found, it may doesn't exists", "statCode": 404})

    newObj.delete(name)

    result = newObj.search(name)

    if result == None:
        return jsonify({"msg": f"Success 204: (id:{id}, name:{name}) is deleted successfully, (id:{id}, name:{name}) doesn't exists anymore", "statCode": 204})
    else:
        return jsonify({"msg": f"Error 500: failed to delete name (id:{id}, name:{name}), (id:{id}, name:{name}) still exists", "statCode": 500})


@app.route("/runman/users/")
@app.route("/runman/users/<int:limit>/")
@app.route("/runman/users/<int:limit>/<int:order>")
@limiter.exempt
def users(limit=None, order=None):
    print('The ip address: ', get_remote_address())
    newObj = RecordsTable()

    if limit == None:
        limit = 0
    if order == None:
        order = 2

    result = newObj.display()
    resultSorted = sorted(result, key=lambda tup: tup[order], reverse=True)
    if limit != 0:
        resultSorted = resultSorted[:limit]
    else:
        pass
    dictOfResult = {}
    j = 0
    for i in resultSorted:
        dictOfResult[j] = {'name': i[0], 'hcoins': i[1], 'htime': i[2]}
        j += 1

    return jsonify(dictOfResult)


# admin
@app.route("/runman/userDelete/<string:nameIn>/<string:password>")
@limiter.exempt
def userDeleteBR19(nameIn, password):
    print('The ip address: ', get_remote_address())

    if BR19_PASSWORD == password:

        newObj = RecordsTable()

        result = newObj.search(nameIn)
        if result == None:
            return jsonify({"msg": f"Error 404: name:{nameIn} was not found, it may doesn't exists", "statCode": 404})

        newObj.delete(nameIn)

        result = newObj.search(nameIn)

        if result == None:
            return jsonify({"msg": f"Success 204: name:{nameIn} is deleted successfully, name:{nameIn} doesn't exists anymore", "statCode": 204})
        else:
            return jsonify({"msg": f"Error 500: failed to delete name:{nameIn}, name:{nameIn} still exists", "statCode": 500})

    else:
        abort(401)


@app.route("/runman/userAdd/<string:nameIn>/<int:hcoins>/<int:htime>/<string:password>")
@limiter.exempt
def userAddBR19(nameIn, hcoins, htime, password):
    print('The ip address: ', get_remote_address())
    newObj = RecordsTable()

    if BR19_PASSWORD == password:

        if " " in nameIn or "\t" in nameIn or f"\n" in nameIn or nameIn == None:
            return jsonify({"msg": f"Invalid input 400: name:{nameIn} contains spaces or invalid characters, therefore player:{nameIn} will not be added", "statCode": 400})

        result = newObj.search(nameIn)
        if result == None:
            pass
        else:
            return jsonify({"msg": f"Error 403: the name {nameIn} already exists", "statCode": 403})

        newObj.insert(nameIn, hcoins, htime)

        recordSearched = newObj.search(nameIn)
        if (recordSearched[0] == nameIn):
            return jsonify({"msg": f"Success 201: player:{nameIn} is recorded, the name matches {(newObj.search(nameIn))[0]}", "statCode": 201})
        else:
            return jsonify({"msg": f"Unkown Error 500: player:{nameIn} was not recorded, the name doesn't match {(newObj.search(nameIn))[0]}", "statCode": 500})

    else:
        abort(401)


# errors


@app.errorhandler(429)
def ratelimit_handler(e):
    return jsonify({"msg": f"Error 429: you have exceeded your rate-limit, any further requests won't be applied", "statCode": 429})


@app.errorhandler(401)
def ratelimit_handler(e):
    return jsonify({"msg": f"Error 401: unauthrized access", "statCode": 401})


@app.errorhandler(500)
def ratelimit_handler(e):
    return jsonify({"msg": f"Error 500: something in our side went wrong, surly we are working to fix it soon, please try again later", "statCode": 500})


@app.errorhandler(503)
def ratelimit_handler(e):
    return jsonify({"msg": f"Error 500: something in our side went wrong, surly we are working to fix it soon, please try again later", "statCode": 500})


@app.errorhandler(405)
def ratelimit_handler(e):
    return jsonify({"msg": f"Error 405: the method used is not allowed, please try again with correct method", "statCode": 405})


@app.errorhandler(404)
def ratelimit_handler(e):
    return jsonify({"msg": f"Error 404: the requested URL was not found on the server. If you entered the URL manually please check your spelling and try again", "statCode": 404})


# other

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static', 'img'),
                               'favicon.ico', mimetype='image/png')
