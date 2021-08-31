from flask import jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity


class JwtTest(Resource):
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        return {"name": current_user}, 200
        # return jsonify({"name": current_user}), 200

