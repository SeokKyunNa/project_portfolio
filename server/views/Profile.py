from flask_restful import Resource, reqparse
from flask import session, jsonify
from models import Profiles
from db_connect import db

# 프로필
class Profile(Resource):
        def get(self):
            session['user_id'] = 'test2' # 테스트용 test
            user_profile = Profiles.query.filter(Profiles.user_id == session['user_id']).first()

            user_profile_json = {
                'image': user_profile.image,
                'introduction': user_profile.introduction,
                'edu_name': user_profile.edu_name,
                'major': user_profile.major,
                'edu_status': user_profile.edu_status
            }

            return jsonify(user_profile_json)

        def post(self):
            try:
                parser = reqparse.RequestParser()
                parser.add_argument('image', type=str, required=True)
                parser.add_argument('introduction', type=str, required=True)
                parser.add_argument('edu_name', type=str, required=True)
                parser.add_argument('major', type=str, required=True)
                parser.add_argument('edu_status', type=str, required=True)
                args = parser.parse_args()

                session['user_id'] = 'test2' # 테스트용 test
                user_id = session['user_id']
                image = args['image']
                introduction = args['introduction']
                edu_name = args['edu_name']
                major = args['major']
                edu_status = args['edu_status']
                
                profile = Profiles(
                    user_id = user_id,
                    image = image,
                    introduction = introduction,
                    edu_name = edu_name,
                    major = major,
                    edu_status = edu_status
                )

                db.session.add(profile)
                db.session.commit()

                return jsonify({"result":"success"})
                
            except Exception as e:
                return jsonify({'error': str(e)})

        def patch(self):
            try:
                session['user_id'] = 'test2' # 테스트용 test
                user_profile = Profiles.query.filter(Profiles.user_id == session['user_id']).first()

                parser = reqparse.RequestParser()
                parser.add_argument('image', type=str, required=True)
                parser.add_argument('introduction', type=str, required=True)
                parser.add_argument('edu_name', type=str, required=True)
                parser.add_argument('major', type=str, required=True)
                parser.add_argument('edu_status', type=str, required=True)
                args = parser.parse_args()

                image = args['image']
                introduction = args['introduction']
                edu_name = args['edu_name']
                major = args['major']
                edu_status = args['edu_status']

                user_profile.image = image
                user_profile.introduction = introduction
                user_profile.edu_name = edu_name
                user_profile.major = major
                user_profile.edu_status = edu_status
                
                db.session.commit()

                return jsonify({"result": "success"})

            except Exception as e:
                return jsonify({'error': str(e)})
