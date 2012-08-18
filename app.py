import os
from flask import Flask, render_template

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
# launch
#-----------------------------

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host = '0.0.0.0', port = port)

