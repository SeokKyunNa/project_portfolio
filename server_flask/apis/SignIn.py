from flask import session, jsonify, abort
from flask_restful import Resource, reqparse
from flask_jwt_extended import create_access_token
from datetime import timedelta
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

                # 가입된 계정인지 확인
                if not user_data:
                    return abort(401, 'invalid account')
                
                # 비밀번호 일치 확인
                if not check_password_hash(user_data.password, password):
                    # return jsonify({"result": "failed"})
                    return abort(401, 'wrong password')
                
                # 세션에 id 저장
                session.clear()
                session['user_id'] = id

                # JWT 생성
                # 토큰 만료 시간 설정
                ACCESS_TOKEN_EXPIRE_MINUTES = 2
                # 토큰의 expire 기한(deadline)을 timedelta 객체 인스턴스 형태로 만들어 변수에 저장
                access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

                # 액세스 토큰을 생성
                access_token = create_access_token(
                    identity=id, expires_delta=access_token_expires)

                # access token 발급해서 response.json 객체로 전달
                return jsonify(access_token=access_token) 
                # return jsonify({"result":"success"})
                
            except Exception as e:
                session.clear()
                
                return jsonify({'error': str(e)})


