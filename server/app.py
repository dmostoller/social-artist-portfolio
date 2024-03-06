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
        reponse = make_response(paintings, 200)
        return reponse

class PaintingsById(Resource):
    def get(self, id):
        painting = Painting.query.filter_by(id=id).first()
        if painting:
            response = make_response(painting.to_dict(), 200)
        else:
            response = make_response({"error": "Painting not found"}, 404)
        return response

class AddPainting(Resource):
    def post(self):
        try:
            form_json = request.get_json()
            new_painting = Painting(
                title=form_json['title'],
                materials=form_json['materials'],
                width=form_json['width'],
                height=form_json['height'],
                price=form_json['price'],
                fullsize=form_json['width'],
                image=form_json['width'],
                sold=form_json['sold']
                # user_id=session.get('user_id')
            )
            db.session.add(new_painting)
            db.session.commit()
            response = make_response(new_painting.to_dict(), 201)
        except ValueError:
            response = make_response({"errors" : ["validation errors"]}, 422)
        
        return response



api.add_resource(Paintings, '/paintings')
api.add_resource(PaintingsById, '/paintings/<int:id>')
api.add_resource(AddPainting, '/paintings/new')

class Comments(Resource):
    pass

class CommentsById(Resource):
    pass

api.add_resource(Comments, '/comments')
api.add_resource(CommentsById, '/comments/<int:id>')


class Posts(Resource):
    def get(self):
        posts = [post.to_dict() for post in Post.query.all()]
        reponse = make_response(posts, 200)
        return reponse

class PostsById(Resource):
    def get(self, id):
        post = Post.query.filter_by(id=id).first()
        if post:
            response = make_response(post.to_dict(), 200)
        else:
            response = make_response({"error": "Post not found"}, 404)
        return response
    
class AddPost(Resource):
    def post(self):
        try:
            form_json = request.get_json()
            new_post = Post(
                title=form_json['title'],
                content=form_json['content'],
                image_url=form_json['image_url'],
                date_added=form_json['date_added'],
                # user_id=session.get('user_id')
            )
            db.session.add(new_post)
            db.session.commit()
            response = make_response(new_post.to_dict(), 201)
        except ValueError:
            response = make_response({"errors" : ["validation errors"]}, 422)
        
        return response


api.add_resource(Posts, '/posts')
api.add_resource(PostsById, '/posts/<int:id>')
api.add_resource(AddPost, '/posts/new')

class Events(Resource):
    def get(self):
        events = [event.to_dict() for event in Event.query.all()]
        reponse = make_response(events, 200)
        return reponse

class EventsById(Resource):
    pass

api.add_resource(Events, '/events')
api.add_resource(EventsById, '/events/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
