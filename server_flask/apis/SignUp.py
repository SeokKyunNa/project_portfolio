from flask_restful import Resource, reqparse
from flask import jsonify, abort
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import generate_password_hash
from models import Users, Profiles
from db_connect import db

# 회원 가입
class SignUp(Resource):
    def get(self):
        return {'hello': 'world'}

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=str, required=True)
        parser.add_argument('password', type=str, required=True)
        parser.add_argument('check_password', type=str, required=True)
        parser.add_argument('name', type=str, required=True)
        args = parser.parse_args()

        id = args['id']
        password = args['password']
        check_password = args['check_password']
        name = args['name']
        
        # ID 중복 체크
        check_duplicate = Users.query.filter(Users.id == id).first()
        if check_duplicate:
            abort(409, "duplicateId")
        
        # 비밀번호 암호화
        hashed_password = generate_password_hash(password)

        user = Users(
            id = id,
            password = hashed_password,
            name = name
        )
        profile = Profiles(
            user_id = id,
            image = "static/imgs/default.png",
            introduction = "자기소개를 작성해주세요."
        )

        try:
            db.session.add(user)
            db.session.commit()

            db.session.add(profile)
            db.session.commit()

        except SQLAlchemyError as e:
            db.session.rollback()

            abort(500, str(e))

        else: 
            return jsonify({"result":"success"})

