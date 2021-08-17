from flask import Flask
from db_connect import db
from flask_restful import Api
from HelloWorld import HelloWorld
from SignUp import SignUp
from Profile import Profile
import config

def create_app():
    app = Flask(__name__)
    app.config.from_object(config) # config 에서 가져온 파일을 사용합니다.
    
    db.init_app(app)
    app.secret_key = "dev"
    app.config['SESSION_TYPE'] = 'filesystem'

    api = Api(app)

    api.add_resource(HelloWorld, '/')
    api.add_resource(SignUp, '/signup')
    api.add_resource(Profile, '/profile/<user_id>')

    return app

if __name__ == "__main__":
    create_app().run(debug=True, port=5000)