from flask import Flask, render_template
from flask import jsonify
from flask import request
# import sqlite3
app = Flask(__name__)

# class RecordTable:

#     def __init__(self):
#         self.conn = sqlite3.connect("dbs\project3DB.db")
#         self.cur = self.conn.cursor()
#         self.cur.execute("CREATE TABLE IF NOT EXISTS mosques (ID INTEGER NOT NULL,name TEXT NOT NULL,type TEXT NOT NULL,address TEXT NOT NULL,coordinates TEXT NOT NULL,imam_name TEXT NOT NULL)")

#     def display(self):
#         self.cur.execute("SELECT * FROM mosques")
#         self.records= self.cur.fetchall()
#         print(self.records)
#         return self.records
    
#     def search(self,name):
#         self.cur.execute("SELECT * FROM mosques WHERE name = ?",(name,))
#         self.records= self.cur.fetchone()
#         print(self.records)
#         return self.records

#     def insert(self, ID,name,type,address,coordinates,imam_name):
#         if (ID=="" or name=="" or type=="" or address=="" or coordinates=="" or imam_name==""):
#             raise Exception("One of the entry fields is empty")
#         self.cur.execute("INSERT INTO mosques VALUES (?,?,?,?,?,?)", (ID,name,type,address,coordinates,imam_name))
#         self.conn.commit()
#         self.clearEntries(t1,t2,t4,t5,t6)

#     def update(self,valueToUpdate,ID):
#         global t1,t2,t3values,t4,t5,t6
#         if (ID==""):
#             raise Exception("You have to select an ID to update its corresponding values")
#         if valueToUpdate=="Name":
#             valuesToUpdate=t2.get()
#             columnToUpdate="name"
#             print(valuesToUpdate,valueToUpdate,columnToUpdate)
#         elif valueToUpdate=="Type":
#             valuesToUpdate=t3values.get()
#             columnToUpdate="type"
#         elif valueToUpdate=="Address":
#             valuesToUpdate=t4.get()
#             columnToUpdate="address"
#         elif valueToUpdate=="Coordinates":
#             valuesToUpdate=t5.get()
#             columnToUpdate="coordinates"
#         elif valueToUpdate=="Imam Name":
#             valuesToUpdate=t6.get()
#             columnToUpdate="imam_name"
#         self.cur.execute(f"UPDATE mosques SET {columnToUpdate} = ? WHERE ID = ?", (valuesToUpdate,ID))
#         self.conn.commit()
#         self.clearEntries(t1,t2,t4,t5,t6)

#     def delete(self,ID):
#         if (ID==""):
#             raise Exception("You have to select an ID to delete its values")
#         self.cur.execute("DELETE FROM mosques WHERE ID = ?",(ID))
#         self.conn.commit()
#         self.clearEntries(t1,t2,t4,t5,t6)
    
#     def clearEntries(self,t1,t2,t4,t5,t6):
#         t1.delete(0,END)
#         t2.delete(0,END)
#         t4.delete(0,END)
#         t5.delete(0,END)
#         t6.delete(0,END)

#     def __del__(self):
#         self.conn.close()
    
#     def openOrClose(self,btn):
#         global counter
#         if counter==0:
#             self.__del__()
#             counter=1
#             btn.config(text=f"\tOpen Database\t")
#         elif counter==1:
#             self.__init__()
#             counter=0
#             btn.config(text=f"\tClose Database\t")


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
def add():
    name = request.args.get('name')
    hcoins = request.args.get('hcoins')
    htime = request.args.get('htime')



    return jsonify({"result": a+b})