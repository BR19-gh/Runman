from flask import Flask, render_template, jsonify, request, abort
import os
from flask.wrappers import Response
import psycopg2
import psycopg2.extras as ext
from flask_cors import CORS
DATABASE_URL = os.environ.get('DATABASE_URL')
BR19_PASSWORD = os.environ.get('BR19_PASSWORD')


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


@app.route("/")
def home_view():
    return render_template('index.html')

@app.route("/ar")
def home_view2():
    return render_template('indexAr.html')


# @app.before_request
# def limit_remote_addr():
#     if request.remote_addr != '74.208.236.105':
#         abort(401)


@app.route("/addUser", methods=['POST', 'GET'])
def addUser():
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
        return jsonify({"msg": f"Error 401: unauthrized access", "statCode": 401})


@app.route("/updateUserRecords", methods=['PUT', 'GET'])
def updateUserRecords():
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
def displayRecords():
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
        return jsonify({"msg": f"Error 401: unauthrized access", "statCode": 401})


@app.route("/searchNameExists")
def searchNameExists():
    newObj = RecordsTable()

    name = request.args.get('name')
    result = newObj.search(name)

    if result == None:
        return jsonify({"msg": f"Success 200: the name {name} doesn't exists, so it can be added", "statCode": 200})
    else:
        return jsonify({"msg": f"Error 403: the name {name} already exists", "statCode": 403})


@app.route("/deleteRecordBR19")
def deleteRecordBR19():
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

        result = newObj.search(dictOfResult[id]['name'])

        newObj.delete(dictOfResult[id]['name'])

        if result == None:
            return jsonify({"msg": f"Success 200: id:{id} is deleted successfully, id:{id} doesn't exists anymore", "statCode": 200})
        else:
            return jsonify({"msg": f"Error 403: failed to delete name id:{id}, id:{id} still exists", "statCode": 500})

    else:
        return jsonify({"msg": f"Error 401: unauthrized access", "statCode": 401})
