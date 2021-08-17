from datetime import date
from flask_restful import Resource, reqparse
from flask import session, jsonify
from models import Educations
from db_connect import db

# 자격증
class Education(Resource):
        def get(self):
            session['user_id'] = 'test2' # 테스트용 test
            user_edu = Educations.query.filter(Educations.user_id == session['user_id']).all()

            edu_list = [
                {
                    'name': edu.name,
                    'major': edu.major,
                    'edu_status': edu.edu_status
                } for edu in user_edu
            ]

            return jsonify(edu_list)

        def post(self):
            try:
                parser = reqparse.RequestParser()
                '''
                받게 되는 데이터 형태
                {
                    "edu_list": [
                        {"name": "edu name 1", "major": "edu major 1", "edu_status": 1}, 
                        {"name": "edu name 2", "major": "edu major 2", "edu_status": 2},
                        {"name": "edu name 3", "major": "edu major 3", "edu_status": 3}
                    ]
                }
                '''
                parser.add_argument('edu_list', type=list, required=True, location='json')

                session['user_id'] = 'test2' # 테스트용 test
                user_id = session['user_id']

                args = parser.parse_args()
                
                for arg in args['edu_list']:
                    name = arg['name']
                    major = arg['major']
                    edu_status = arg['edu_status']

                    edu_list = Educations(
                        user_id = user_id,
                        name = name,
                        major = major,
                        edu_status = edu_status
                    )

                    db.session.add(edu_list)
                
                db.session.commit()

                return jsonify({"result":"success"})
                
            except Exception as e:
                return jsonify({'error': str(e)})

        def patch(self):
            try:
                session['user_id'] = 'test2' # 테스트용 test

                parser = reqparse.RequestParser()
                parser.add_argument('edu_list', type=list, required=True, location='json')
                args = parser.parse_args()

                # id별로 돌면서 각 필드들을 update
                for arg in args['edu_list']:
                    id = arg['id']
                    name = arg['name']
                    major = arg['major']
                    edu_status = arg['edu_status']
                    
                    user_edu = Educations.query.filter(Educations.id == id).first()
                    
                    user_edu.name = name
                    user_edu.major = major
                    user_edu.edu_status = edu_status
                
                db.session.commit()

                return jsonify({"result": "success"})

            except Exception as e:
                return jsonify({'error': str(e)})

        def delete(self, id):
            try:
                user_edu = Educations.query.filter(Educations.id == id).first()

                db.session.delete(user_edu)
                db.session.commit()

                return jsonify({"result": "success"})
            except Exception as e:
                return jsonify({'error': str(e)})
