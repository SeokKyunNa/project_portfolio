from flask_restful import Resource, reqparse
from flask import session, jsonify, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.exc import SQLAlchemyError
from models import Awards
from db_connect import db


# 수상 내역
class Award(Resource):
    def get(self):
        # current_user = get_jwt_identity()
        # print("현재 사용자 Id : ", current_user)
        session['user_id'] = 'test2' # 테스트용 test
        user_award = Awards.query.filter(Awards.user_id == session['user_id']).all()

        award_list = [
            {
                'award': award.award,
                'details': award.details
            } for award in user_award
        ]

        return jsonify(award_list)

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

        session['user_id'] = 'test2' # 테스트용 test
        user_id = session['user_id']

        args = parser.parse_args()
        for arg in args['award_list']:
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

    def patch(self):
        try:
            session['user_id'] = 'test2' # 테스트용 test

            parser = reqparse.RequestParser()
            parser.add_argument('award_list', type=list, required=True, location='json')
            args = parser.parse_args()

            # id별로 돌면서 각 필드들을 update
            for arg in args['award_list']:
                id = arg['id']
                award = arg['award']
                details = arg['details']
                
                user_award = Awards.query.filter(Awards.id == id).first()
                
                user_award.award = award
                user_award.details = details
            
            db.session.commit()

            return jsonify({"result": "success"})

        except Exception as e:
            db.session.rollback()

            return jsonify({'error': str(e)})

    def delete(self, id):
        user_award = Awards.query.filter(Awards.id == id).first()

        # 삭제할 데이터가 없을 때 처리해줘야 함

        
        try:
            db.session.delete(user_award)
            db.session.commit()
            
        except SQLAlchemyError as e:
            db.session.rollback()
            
            abort(500, str(e))

        else:
            return jsonify({"result": "success"})
