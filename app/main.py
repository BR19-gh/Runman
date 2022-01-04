from flask import Flask, render_template, jsonify, request, abort
import os
from flask.wrappers import Response
import psycopg2
import psycopg2.extras as ext
from flask_cors import CORS, cross_origin
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

DATABASE_URL = os.environ.get('DATABASE_URL')
BR19_PASSWORD = os.environ.get('BR19_PASSWORD')


app = Flask(__name__,template_folder='templates')
cors = CORS(app, resources={r"/displayRecords": {"origins": "http://br19.me"}})

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
        print(self.records)
        return self.records

    def search(self, name):
        self.cur.execute(f"SELECT * FROM records WHERE name = '{name}'")
        self.record = self.cur.fetchone()
        print(self.record)
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


app = Flask(__name__,template_folder='templates')
CORS(app)

##### routes

###### main

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

###### Runman

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

###### DemonsKiller

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

###### Dagshtick

@app.route("/dagshtick")
@limiter.exempt
def home_view_dagshtick():
    return render_template('Dagshtick/index.html')

###### dawrati

@app.route("/dawrati")
@limiter.exempt
def home_view_dawrati():
    return render_template('dawrati/home.html')

###### Blogger

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

###### onethree

@app.route("/onethree")
@limiter.exempt
def home_view_onethree():
    return render_template('onethree/index.html')


##### end of routes


###### Runman Backend

@app.route("/addUser", methods=['POST', 'GET'])
@limiter.limit('1 per 30seconds')
@cross_origin(origin='br19.me')
def addUser():
    print('The ip address: ',get_remote_address())
    newObj = RecordsTable()

    name = request.args.get('name')
    hcoins = request.args.get('hcoins')
    htime = request.args.get('htime')

    result = newObj.search(name)

    if result == None:
        pass
    else:
        return jsonify({"msg": f"Error 403: the name {name} already exists", "statCode": 403})

    newObj.insert(name, hcoins, htime)
    recordSearched = newObj.search(name)

    if (recordSearched[0] == name):
        return jsonify({"msg": f"Success 200: player {name} is recorded, the name matches {(newObj.search(name))[0]}", "statCode": 200})
    else:
        return jsonify({"msg": f"Unkown Error 500: player {name} was not recorded, the name doesn't match {(newObj.search(name))[0]}", "statCode": 500})


@app.route("/addUserBR19")
@limiter.exempt
@cross_origin(origin='*')
def addUserBR19():
    newObj = RecordsTable()

    password = request.args.get('password')
    if password == BR19_PASSWORD:

        name = request.args.get('name')
        hcoins = request.args.get('hcoins')
        htime = request.args.get('htime')

        newObj.insert(name, hcoins, htime)
        recordSearched = newObj.search(name)

        if (recordSearched[0] == name):
            return jsonify({"msg": f"Success 200: player {name} is recorded, the name matches {(newObj.search(name))[0]}", "statCode": 200})
        else:
            return jsonify({"msg": f"Unkown Error 500: player {name} was not recorded, the name doesn't match {(newObj.search(name))[0]}", "statCode": 500})

    else:
        abort(401)


@app.route("/updateUserRecords", methods=['PUT', 'GET'])
@limiter.limit('1 per 30seconds')
@cross_origin(origin='br19.me')
def updateUserRecords():
    print('The ip address: ',get_remote_address())
    newObj = RecordsTable()

    name = request.args.get('name')
    hcoins = request.args.get('hcoins')
    htime = request.args.get('htime')

    oldUserRecord = newObj.search(name)

    newObj.update(name, hcoins, htime)

    recordSearched = newObj.search(name)
    if recordSearched == None:
        return jsonify({"msg": f"Error 404: player {name} was not updated because they didn't have a record before (maybe first time playing?) ", "statCode": 404})
    elif (recordSearched[0] == name):
        return jsonify({"msg": f"Success 200: player {name} is updated, old data:{oldUserRecord}, new data:{newObj.search(name)}", "statCode": 200})
    else:
        return jsonify({"msg": f"Unkown Error 500: player {name} was not updated, old data:{oldUserRecord}, new data:{newObj.search(name)}", "statCode": 500})


@app.route("/displayRecords")
@limiter.exempt
@cross_origin(origin='br19.me')
def displayRecords():
    print('The ip address: ',get_remote_address())
    newObj = RecordsTable()

    limit = request.args.get('limit')
    order = request.args.get('order')
    limit = int(limit)
    order = int(order)

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


@app.route("/displayRecordsBR19")
@limiter.exempt
@cross_origin(origin='*')
def displayRecordsBR19():
    newObj = RecordsTable()

    password = request.args.get('password')
    if password == BR19_PASSWORD:

        newObj = RecordsTable()

        limit = request.args.get('limit')
        order = request.args.get('order')
        limit = int(limit)
        order = int(order)

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

    else:
        abort(401)


@app.route("/searchNameExists")
@limiter.exempt
@cross_origin(origin='br19.me')
def searchNameExists():
    newObj = RecordsTable()

    name = request.args.get('name')
    result = newObj.search(name)

    if result == None:
        return jsonify({"msg": f"Success 200: the name {name} doesn't exists, so it can be added", "statCode": 200})
    else:
        return jsonify({"msg": f"Error 403: the name {name} already exists", "statCode": 403})


@app.route("/deleteRecordByIdBR19")
@limiter.exempt
@cross_origin(origin='*')
def deleteRecordByIdBR19():
    newObj = RecordsTable()

    password = request.args.get('password')
    if password == BR19_PASSWORD:

        id = request.args.get('id')
        id = int(id)

        result = newObj.display()
        resultSorted = sorted(result, key=lambda tup: tup[2], reverse=True)
        dictOfResult = {}
        j = 0
        for i in resultSorted:
            dictOfResult[j] = {'name': i[0], 'hcoins': i[1], 'htime': i[2]}
            j += 1
        name = dictOfResult[id]['name']
        newObj.delete(dictOfResult[id]['name'])

        result = newObj.search(dictOfResult[id]['name'])

        if result == None:
            return jsonify({"msg": f"Success 200: (id:{id}, name:{name}) is deleted successfully, (id:{id}, name:{name}) doesn't exists anymore", "statCode": 200})
        else:
            return jsonify({"msg": f"Error 403: failed to delete name (id:{id}, name:{name}), (id:{id}, name:{name}) still exists", "statCode": 500})

    else:
        abort(401)


@app.route("/deleteRecordByNameBR19")
@limiter.exempt
@cross_origin(origin='*')
def deleteRecordBR19ByName():
    newObj = RecordsTable()

    password = request.args.get('password')
    if password == BR19_PASSWORD:

        name = request.args.get('name')

        newObj.delete(name)

        result = newObj.search(name)

        if result == None:
            return jsonify({"msg": f"Success 200: name:{name} is deleted successfully, name:{name} doesn't exists anymore", "statCode": 200})
        else:
            return jsonify({"msg": f"Error 403: failed to delete name:{name}, name:{name} still exists", "statCode": 500})

    else:
            abort(401)


##### errors

@app.errorhandler(429)
def ratelimit_handler(e):
  return jsonify({"msg": f"Error 429: you have exceeded your rate-limit, any requests won't be applied", "statCode": 429})

@app.errorhandler(401)
def ratelimit_handler(e):
   return jsonify({"msg": f"Error 401: unauthrized access", "statCode": 401})