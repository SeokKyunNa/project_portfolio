from flask import session, jsonify, abort
from flask_restful import Resource, reqparse
from flask_jwt_extended import create_access_token, create_refresh_token, set_access_cookies, set_refresh_cookies, unset_jwt_cookies
from werkzeug.security import check_password_hash
from models import Users

# 로그인
class SignIn(Resource):
    def get(self):
        return {'hello': 'world'}

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=str, required=True)
        parser.add_argument('password', type=str, required=True)
        args = parser.parse_args()

        id = args['id']
        password = args['password']

        user_data = Users.query.filter(Users.id == id).first()

        # 가입된 계정인지 확인
        if not user_data:
            abort(401, 'invalidAccount')
        
        # 비밀번호 일치 확인
        if not check_password_hash(user_data.password, password):
            # return jsonify({"result": "failed"})
            abort(401, 'wrongPassword')
            
        try:
            # session에 id 저장
            session.clear()
            session['user_id'] = id
            print("로그인 세션:", session['user_id'])

            # 액세스 토큰을 생성
            response = jsonify({"msg": "login successful"})
            
            access_token = create_access_token(identity=id)
            # refresh_token = create_refresh_token(identity=id)
            
            # refresh 토큰은 쿠키에 저장
            # set_access_cookies(response, access_token)
            # set_refresh_cookies(response, refresh_token)
            
        except Exception as e:
            session.clear()
            # unset_jwt_cookies(response)

            abort(500, str(e))
        
        else:
            # return jsonify(access_token=access_token, refresh_token=refresh_token)
            return jsonify(access_token=access_token)
