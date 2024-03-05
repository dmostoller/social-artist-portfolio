#!/usr/bin/env python3
# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, request, session 
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Painting, Comment, Post, Event 

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


class Users(Resource):
    pass

class UsersById(Resource):
    pass

api.add_resource(Users, '/users')
api.add_resource(UsersById, '/users/<int:id>')


class Paintings(Resource):
    def get(self):
        paintings = [painting.to_dict() for painting in Painting.query.all()]
        return make_response(paintings, )


class PaintingsById(Resource):
    pass

api.add_resource(Paintings, '/paintings')
api.add_resource(PaintingsById, '/paintings/<int:id>')


class Comments(Resource):
    pass

class CommentsById(Resource):
    pass

api.add_resource(Comments, '/comments')
api.add_resource(CommentsById, '/comments/<int:id>')


class Posts(Resource):
    pass

class PostsById(Resource):
    pass

api.add_resource(Posts, '/posts')
api.add_resource(PostsById, '/posts/<int:id>')


class Events(Resource):
    pass

class EventsById(Resource):
    pass

api.add_resource(Events, '/events')
api.add_resource(EventsById, '/events/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
