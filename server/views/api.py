from flask import Blueprint, render_template, request, url_for, session, flash, redirect, jsonify
from models import *
# from bcrypt import hashpw, checkpw, gensalt
from werkzeug.security import generate_password_hash, check_password_hash
import requests

ptf = Blueprint('ptf', __name__)

@ptf.route("/")
def home():
    return render_template("base.html")

@ptf.route("/signup", methods=["GET", "POST"]))
def signup():
    if request.method == "GET":
        return render_template("signup.html")

@ptf.route("/signin", methods=["GET", "POST"])
def signin():
    if request.method == "GET":
        return render_template("signin.html")

