from flask import Flask, render_template
from flask import jsonify
from flask import request
import os
import psycopg2
import psycopg2.extras as ext
DATABASE_URL = os.environ.get('DATABASE_URL')

class RecordsTable:

    def __init__(self):
        self.conn = psycopg2.connect(DATABASE_URL, sslmode='require')
        self.cur = self.conn.cursor(cursor_factory=ext.DictCursor)
        self.cur.execute("CREATE TABLE IF NOT EXISTS records (name TEXT NOT NULL,hcoins INTEGER NOT NULL,htime INTEGER NOT NULL)")

    def display(self):
        self.cur.execute("SELECT * FROM records")
        self.records= self.cur.fetchall()
        print(self.records)
        return self.records
    
    def search(self,name):
        self.cur.execute(f"SELECT * FROM records WHERE name = '{name}'")
        self.record= self.cur.fetchone()
        print(self.record)
        return self.record

    def insert(self,name,hcoins,htime):
        if (name=="" or hcoins=="" or htime==""):
            raise Exception("One of the entries is empty")
        self.cur.execute(f"INSERT INTO records VALUES {(name,hcoins,htime)}")
        self.conn.commit()

    # def update(self,name):
    #     if (name==""):
    #         raise Exception("You have to select a name to update its corresponding values")
    #     self.cur.execute(f"UPDATE mosques SET {columnToUpdate} = ? WHERE name = ?", (valuesToUpdate,name))
    #     self.conn.commit()

    def delete(self,name):
        if (name==""):
            raise Exception("You have to select a name to delete its values")
        self.cur.execute(f"DELETE FROM mosques WHERE name = '{name}'")
        self.conn.commit()
    

    def __del__(self):
        self.conn.close()
    
    

app = Flask(__name__)


@app.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response

@app.route("/")
def home_view():
        return "<h1>Runman Backend</h1>"

# @app.route("/add")
# def add():
#     a = request.args.get('a')
#     b = request.args.get('b')
#     return jsonify({"result": a+b})

@app.route("/addUser")
def addUser():
    newObj = RecordsTable()

    name = request.args.get('name')
    hcoins = request.args.get('hcoins')
    htime = request.args.get('htime')

    newObj.insert(name,hcoins,htime)

    if ((newObj.search(name))[0] == name and (newObj.search(name))[1] == hcoins):
        return jsonify({"msg": f"success: {name} recorded"})
    else:
        return jsonify({"msg": f"fail: {name} was not recorded"})

@app.route("/displayRecords")
def displayRecords():
    newObj = RecordsTable()

    result = newObj.display()

    dictOfResult={}
    for i in result:
        dictOfResult[i[0]]=[i[1],i[2]]

    return jsonify(dictOfResult)