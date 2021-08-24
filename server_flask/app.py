from flask import Flask
from db_connect import db
from flask_restful import Api
from flask_jwt_extended import JWTManager
from apis import Award, Certificate, Education, Profile, Project, SignIn, SignUp, SignOut, UserList
from flask_cors import CORS
from flask_migrate import Migrate
import config
import refresh_jwt

def create_app():
    app = Flask(__name__)
    app.config.from_object(config) # config 에서 가져온 파일을 사용합니다.
    app.after_request(refresh_jwt.refresh_expiring_jwts)    # request를 보낼때마다 refresh jwt

    db.init_app(app)
    migrate = Migrate(app, db)
    jwt = JWTManager(app)
    CORS(app)

    api = Api(app)

    api.add_resource(SignIn.SignIn, '/signin')
    api.add_resource(SignUp.SignUp, '/signup')
    api.add_resource(SignOut.SignOut, '/signout')
    api.add_resource(UserList.UserList, '/userlist', '/userlist/<name>')
    api.add_resource(Profile.Profile, '/profile', '/profile/<id>')
    api.add_resource(Award.Award, '/award', '/award/<user_id>')
    api.add_resource(Certificate.Certificate, '/certificate', '/certificate/<id>')
    api.add_resource(Project.Project, '/project', '/project/<id>')
    api.add_resource(Education.Education, '/education', '/education/<id>')
    
    return app


if __name__ == "__main__":
    create_app().run(debug=True, port=5000)