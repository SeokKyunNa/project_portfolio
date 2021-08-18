from datetime import date
from flask_restful import Resource, reqparse
from flask import session, jsonify
from models import Projects
from db_connect import db

# 프로젝트
class Project(Resource):
        def get(self):
            session['user_id'] = 'test2' # 테스트용 test
            user_prj = Projects.query.filter(Projects.user_id == session['user_id']).all()

            prj_list = [
                {
                    'title': prj.title,
                    'content': prj.content,
                    'start_date': prj.start_date,
                    'end_date': prj.end_date
                } for prj in user_prj
            ]

            return jsonify(prj_list)

        def post(self):
            try:
                parser = reqparse.RequestParser()
                '''
                받게 되는 데이터 형태
                {
                    "prj_list": [
                        {"title": "prj title 1", "content": "prj content 1", "start_date": "2000-01-01", "end_date": "2000-12-01"}, 
                        {"title": "prj title 2", "content": "prj content 2", "start_date": "2000-01-02", "end_date": "2000-12-01"},
                        {"title": "prj title 3", "content": "prj content 3", "start_date": "2000-01-03", "end_date": "2000-12-01"}
                    ]
                }
                '''
                parser.add_argument('prj_list', type=list, required=True, location='json')

                session['user_id'] = 'test2' # 테스트용 test
                user_id = session['user_id']

                args = parser.parse_args()
                
                for arg in args['prj_list']:
                    title = arg['title']
                    content = arg['content']
                    start_date = arg['start_date']
                    end_date = arg['end_date']

                    prj_list = Projects(
                        user_id = user_id,
                        title = title,
                        content = content,
                        start_date = start_date,
                        end_date = end_date
                    )

                    db.session.add(prj_list)
                
                db.session.commit()

                return jsonify({"result":"success"})
                
            except Exception as e:
                return jsonify({'error': str(e)})

        def patch(self):
            try:
                session['user_id'] = 'test2' # 테스트용 test

                parser = reqparse.RequestParser()
                parser.add_argument('prj_list', type=list, required=True, location='json')
                args = parser.parse_args()

                # id별로 돌면서 각 필드들을 update
                for arg in args['prj_list']:
                    id = arg['id']
                    title = arg['title']
                    content = arg['content']
                    start_date = arg['start_date']
                    end_date = arg['end_date']
                    
                    user_prj = Projects.query.filter(Projects.id == id).first()
                    
                    user_prj.title = title
                    user_prj.content = content
                    user_prj.start_date = start_date
                    user_prj.end_date = end_date
                
                db.session.commit()

                return jsonify({"result": "success"})

            except Exception as e:
                return jsonify({'error': str(e)})

        def delete(self, id):
            try:
                user_prj = Projects.query.filter(Projects.id == id).first()

                db.session.delete(user_prj)
                db.session.commit()

                return jsonify({"result": "success"})
            except Exception as e:
                return jsonify({'error': str(e)})
