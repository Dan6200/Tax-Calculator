from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/calculate', methods=['POST'])
def calculate():
    basic = float(request.form['basic'])
    transportation = float(request.form['transportation'])
    housing = float(request.form['housing'])
    does_nhis = bool(request.form['nhis'])
    does_nhf = bool(request.form['nhf'])
