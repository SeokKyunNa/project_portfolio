from flask import Flask
from db_connect import db
from flask_restful import Api
from views import Award, Certificate, Profile, Project, SignIn, SignUp
from views import HelloWorld
import config

def create_app():
    app = Flask(__name__)
    app.config.from_object(config) # config 에서 가져온 파일을 사용합니다.
    
    db.init_app(app)
    app.secret_key = "dev"
    app.config['SESSION_TYPE'] = 'filesystem'

    api = Api(app)

    api.add_resource(HelloWorld.HelloWorld, '/')
    api.add_resource(SignIn.SignIn, '/signin')
    api.add_resource(SignUp.SignUp, '/signup')
    api.add_resource(Profile.Profile, '/profile')
    api.add_resource(Award.Award, '/award', '/award/<int:id>')
    api.add_resource(Certificate.Certificate, '/certificate', '/certificate<int:id>')
    api.add_resource(Project.Project, '/project', '/project/<int:id>')

    return app

if __name__ == "__main__":
    create_app().run(debug=True, port=5000)