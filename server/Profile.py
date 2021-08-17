from flask_restful import Resource, reqparse
from flask import session, jsonify
from models import Profiles
from db_connect import db

# 프로필
class Profile(Resource):
        def get(self, user_id):
            # user_profile = Profiles.query.filter(Profiles.user_id == session['user_id']).first()
            # id는 어차피 session에서 갖고다니기때문에 user_id는 테스트용 parameter
            user_profile = Profiles.query.filter(Profiles.user_id == user_id).first()
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

        def put(self):
            pass