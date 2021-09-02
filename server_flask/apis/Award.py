from flask_restful import Resource, reqparse
from flask import session, jsonify, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.exc import SQLAlchemyError
from models import Awards
from db_connect import db


# 수상 내역
class Award(Resource):
    # @jwt_required()
    def get(self, user_id):
        # current_user = get_jwt_identity()
        # print("현재 사용자 Id : _" + current_user + "_")
        # print("주소 매개변수로 받은 id : _" + user_id + "_")
        user_id = user_id.strip()
        
        user_award = Awards.query.filter(Awards.user_id == user_id).all()

        award_list = {'award_list': [
            award.to_dict() for award in user_award
        ]}

        return jsonify(award_list)

    # @jwt_required()
    def post(self):
        parser = reqparse.RequestParser()
        '''
        받게 되는 데이터 형태
        {
            "award_list": [
                {"award": "award title 2", "details": "award details 2"}, 
                {"award": "award title 3", "details": "award details 3"},
                {"award": "award title 4", "details": "award details 4"}
            ]
        }
        '''
        parser.add_argument('award_list', type=list, required=True, location='json')
        parser.add_argument('user_id', type=str, required=True)

        # print("award session:", session['user_id'])
        # user_id = session['user_id']
        args = parser.parse_args()
        user_id = args['user_id']
        for arg in args['award_list']:
            # id가 있으면 이미 존재하는 데이터이므로 patch로 pass
            if 'id' in arg: continue

            award = arg['award']
            details = arg['details']
            
            award_list = Awards(
                user_id = user_id,
                award = award,
                details = details
            )

            db.session.add(award_list)
        
        try:
            db.session.commit()

        except SQLAlchemyError as e:
            db.session.rollback()

            abort(500, str(e))

        else: 
            return jsonify({"result":"success"})

    # @jwt_required()
    def patch(self):
        parser = reqparse.RequestParser()
        parser.add_argument('award_list', type=list, required=True, location='json')
        args = parser.parse_args()

        # id별로 돌면서 각 필드들을 update, id가 없는 데이터는 pass
        for arg in args['award_list']:
            if 'id' in arg: id = arg['id']
            else: continue
            award = arg['award']
            details = arg['details']
            
            user_award = Awards.query.filter(Awards.id == id).first()
            
            user_award.award = award
            user_award.details = details

        try:    
            db.session.commit()
        except Exception as e:
            db.session.rollback()

            return jsonify({'error': str(e)})
        else: 
            return jsonify({"result": "success"})

    # @jwt_required()
    def delete(self, user_id):
        user_id = user_id.strip()
        print("삭제할 ID", user_id)

        # user_id를 받아오지만 사실은 awards 컬럼의 id(int)를 받음
        user_award = Awards.query.filter(Awards.id == user_id).first()

        # 삭제할 데이터가 없을 때 처리해줘야 함
        
        try:
            db.session.delete(user_award)
            db.session.commit()
            
        except SQLAlchemyError as e:
            db.session.rollback()
            
            abort(500, str(e))

        else:
            return jsonify({"result": "success"})
