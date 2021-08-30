from flask import session, jsonify
from flask_restful import Resource
from flask_jwt_extended import unset_jwt_cookies, jwt_required
from flask_jwt_extended import get_jwt_identity

# 로그아웃
class SignOut(Resource):
    # @jwt_required()
    def post(self):
        # current_user = get_jwt_identity()
        # print("현재 사용자 :", current_user)
        try:
            response = jsonify({"msg": "logout successful"})
            # session 삭제
            session.clear()
            # 토큰 unset
            unset_jwt_cookies(response)
            
        except Exception as e:
            return jsonify({'error': str(e)})

        else:
            return response


