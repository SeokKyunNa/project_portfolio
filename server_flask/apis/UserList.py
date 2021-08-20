from flask_restful import Resource, reqparse
from flask import session, jsonify
from models import Users, Profiles
from db_connect import db

# 사용자 리스트 (네트워크 화면)
class UserList(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('searchname', type=str, default='')
        args = parser.parse_args()

        searchname = args['searchname']
        search = "%{}%".format(searchname)
        users = db.session.query(Users, Profiles).filter(Users.name.like(search), Users.id==Profiles.user_id).all()

        user_list = [
            {
                'username': user[0].name,
                'introduction': user[1].introduction
            } for user in users
        ]

        return jsonify(user_list)
