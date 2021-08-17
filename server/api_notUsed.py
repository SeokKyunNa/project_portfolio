# from flask import Blueprint, render_template, request, session, redirect, jsonify, g
# from flask_restful import Resource, Api
# from models import *
# # from bcrypt import hashpw, checkpw, gensalt
# from werkzeug.security import generate_password_hash, check_password_hash
# import requests

# # ptf = Blueprint('ptf', __name__)

# # @ptf.before_app_request
# # def load_logged_in_user():
# #     user_id = session.get("signin")
# #     if signin is None:
# #         g.user = None
# #     else:
# #         g.user = db.session.query(Users).filter(Users.id == user_id).first()
# api = Api(app)

# @ptf.route("/")
# def home():
#     return render_template("index.html")

# @ptf.route("/signup", methods=["GET", "POST"])
# def signup():
#     if request.method == "GET":
#         return render_template()
#     elif request.method == "POST":
#         return jsonify()

# @ptf.route("/signin", methods=["GET", "POST"])
# def signin():
#     if request.method == "GET":
#         return jsonify()

