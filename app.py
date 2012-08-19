import os
from flask import Flask, render_template, request
import _mysql

import database
import utils

try:
    import simplejson as json
except ImportError as e:
    import json

#-----------------------------
# initialization
#-----------------------------

app = Flask(__name__)

app.config.update(
    DEBUG = True
)

app.config["SECRET_KEY"] = ";#A1\xb3\xed\xfbY\xa4\x01\x99/[]\xfd#\x90\x8c\xc3\x8bla\x10\x9f";

#-----------------------------
# functions
#-----------------------------

#-----------------------------
# views
#-----------------------------

@app.route("/")
def hello():
    return render_template("index.html")

#-----------------------------
# API methods
#-----------------------------

@app.route("/insights", methods=['get'])
def get_insights():
    conn = utils.get_db_conn()
    insights = conn.query("select * from insights")
    for i in range(len(insights)):
        insights[i]['created'] = ""
        insights[i]['modified'] = ""
    return json.dumps(insights)

@app.route("/edges", methods=['get'])
def get_edges():
    conn = utils.get_db_conn()
    edges = conn.query("select * from insights_insights")
    return json.dumps(edges)

@app.route('/addinsight', methods=['post'])
def add_insight():
    conn = utils.get_db_conn()

    data = request.data
    if not data:
        data = request.form.keys()[0]

    query = 'insert into insights (`text`) values(\'' + data + '\')';
    print query
    conn.query(query)
    return "success"

@app.route('/addedge', methods=['post'])
def add_edge():
    conn = utils.get_db_conn()
    a_id = json.loads(request.values.get('a_id'))
    b_id = json.loads(request.values.get('b_id'))
    
    print "hahaha"
    print a_id, b_id
    conn.query('insert into insights_insights (`insight_a_id`, `insight_b_id`) values (\'' + a_id +'\', \'' + b_id + '\')');
    return "success"

#-----------------------------
# launch
#-----------------------------

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host = '0.0.0.0', port = port)

