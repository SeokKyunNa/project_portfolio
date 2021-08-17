from flask_restful import Resource, reqparse
from flask import session, jsonify
from werkzeug.security import check_password_hash
from models import Users

# 로그인
class SignIn(Resource):
        def get(self):
            return {'hello': 'world'}

        def post(self):
            try:
                parser = reqparse.RequestParser()
                parser.add_argument('id', type=str, required=True)
                parser.add_argument('password', type=str, required=True)
                args = parser.parse_args()

                id = args['id']
                password = args['password']

                user_data = Users.query.filter(Users.id == id).first()
                
                # 비밀번호 일치 확인
                if not check_password_hash(user_data.password, password):
                    return jsonify({"result": "failed"})
                
                # 세션에 id 저장
                session.clear()
                session['user_id'] = id
                
                return jsonify({"result":"success"})
                
            except Exception as e:
                return jsonify({'error': str(e)})


