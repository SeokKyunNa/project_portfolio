from flask_restful import Resource, reqparse
from flask import session, jsonify
from models import Users, Profiles
from db_connect import db

# 사용자 리스트 (네트워크 화면)
class UserList(Resource):
    def get(self, searchname=''):
        searchname = searchname.strip()
        search = "%{}%".format(searchname)
        users = db.session.query(Users, Profiles).filter(Users.name.like(search), Users.id==Profiles.user_id).all()
        
        user_list = [
            {
                'user_id': user[0].id,
                'name': user[0].name,
                'introduction': user[1].introduction,
                'image': user[1].image
            } for user in users
        ]

        return jsonify(user_list)
