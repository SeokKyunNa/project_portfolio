from flask import jsonify, abort
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token

class RefreshToken(Resource):
    @jwt_required(refresh=True)
    def refresh():
        try:
            identity = get_jwt_identity()
            access_token = create_access_token(identity=identity)
        except Exception as e:
            abort(404, str(e))
        else:
            return jsonify(access_token=access_token)