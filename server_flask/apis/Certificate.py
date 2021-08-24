from datetime import date
from flask_restful import Resource, reqparse
from flask import session, jsonify, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.exc import SQLAlchemyError
from models import Certificates
from db_connect import db

# 자격증
class Certificate(Resource):
    # @jwt_required()
    def get(self, user_id):
        # current_user = get_jwt_identity()
        user_id = user_id.strip()
        # print("자격증 아이디 :_" + user_id + "_")

        user_cert = Certificates.query.filter(Certificates.user_id == user_id).all()

        cert_list = [
            {
                'name': cert.name,
                'issued_by': cert.issued_by,
                'acquisition_date': cert.acquisition_date
            } for cert in user_cert
        ]

        return jsonify(cert_list)

    @jwt_required()
    def post(self):
        try:
            parser = reqparse.RequestParser()
            '''
            받게 되는 데이터 형태
            {
                "cert_list": [
                    {"name": "cert title 1", "issued_by": "cert issued_by 1", "acquisition_date": "2000-01-01"}, 
                    {"name": "cert title 2", "issued_by": "cert issued_by 2", "acquisition_date": "2000-01-02"},
                    {"name": "cert title 3", "issued_by": "cert issued_by 3", "acquisition_date": "2000-01-03"}
                ]
            }
            '''
            parser.add_argument('cert_list', type=list, required=True, location='json')

            session['user_id'] = 'test2' # 테스트용 test
            user_id = session['user_id']

            args = parser.parse_args()
            
            for arg in args['cert_list']:
                name = arg['name']
                issued_by = arg['issued_by']
                acquisition_date = arg['acquisition_date']

                cert_list = Certificates(
                    user_id = user_id,
                    name = name,
                    issued_by = issued_by,
                    acquisition_date = acquisition_date
                )

                db.session.add(cert_list)
            
            db.session.commit()

            return jsonify({"result":"success"})
            
        except Exception as e:
            db.session.rollback()

            return jsonify({'error': str(e)})

    @jwt_required()
    def patch(self):
        try:
            session['user_id'] = 'test2' # 테스트용 test

            parser = reqparse.RequestParser()
            parser.add_argument('cert_list', type=list, required=True, location='json')
            args = parser.parse_args()

            # id별로 돌면서 각 필드들을 update
            for arg in args['cert_list']:
                id = arg['id']
                name = arg['name']
                issued_by = arg['issued_by']
                acquisition_date = arg['acquisition_date']
                
                user_cert = Certificates.query.filter(Certificates.id == id).first()
                
                user_cert.name = name
                user_cert.issued_by = issued_by
                user_cert.acquisition_date = acquisition_date
            
            db.session.commit()

            return jsonify({"result": "success"})

        except Exception as e:
            db.session.rollback()

            return jsonify({'error': str(e)})

    @jwt_required()
    def delete(self, id):
        try:
            user_award = Certificates.query.filter(Certificates.id == id).first()

            db.session.delete(user_award)
            db.session.commit()

            return jsonify({"result": "success"})
        except Exception as e:
            db.session.rollback()
            
            return jsonify({'error': str(e)})
