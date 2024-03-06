#!/usr/bin/env python3
# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, request, session 
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError


# Local imports
from config import app, db, api
# Add your model imports
from models import User, Painting, Comment, Post, Event 

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Signup(Resource):
    def post(self):
        try:
            form_json = request.get_json()
            if form_json['password'] == form_json['password_confirmation']:
                new_user = User(
                    username=form_json['username'],
                    password_hash=form_json['password'],
                    email=form_json['email'],
                    is_admin=False
                )
                db.session.add(new_user)
                db.session.commit()
                session['user_id'] = new_user.id 
                response = make_response(new_user.to_dict(rules = ('-_password_hash', )), 201)
            else:
                raise AttributeError("Passwords must match")
        except IntegrityError:
            response = make_response({'errors': ['validation errors']}, 422)
        
        return response

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(rules = ('-_password_hash', )), 200
        return make_response({'errors': 'You must be logged in'}, 401)

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']
        user = User.query.filter(User.username == username).first()
        if user and user.authenticate(password):
            session['user_id'] = user.id
            return make_response(user.to_dict(rules = ('-_password_hash', )), 200)
        return make_response({'errors': 'Invalid username or password'}, 401)

class Logout(Resource):
    def delete(self):
        if session['user_id'] == None:
            return {'error': 'No user found'}, 401
        session['user_id'] = None
        return {}, 204

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')


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
            sold_response = eval(request.get_json()['sold'])
            form_json = request.get_json()
            new_painting = Painting(
                title=form_json['title'],
                materials=form_json['materials'],
                width=form_json['width'],
                height=form_json['height'],
                price=form_json['price'],
                fullsize=form_json['fullsize'],
                image=form_json['image'],
                sold=sold_response,
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

class AddEvent(Resource):
    def post(self):
        try:
            form_json = request.get_json()
            new_event = Event(
                name=form_json['name'],
                venue=form_json['venue'],
                location=form_json['location'],
                details=form_json['details'],
                image_url=form_json['image_url'],
                event_date=form_json['event_date'],
                event_link=form_json['event_link']
            )
            db.session.add(new_event)
            db.session.commit()
            response = make_response(new_event.to_dict(), 201)
        except ValueError:
            response = make_response({"errors" : ["validation errors"]}, 422)
        
        return response

api.add_resource(Events, '/events')
api.add_resource(EventsById, '/events/<int:id>')
api.add_resource(AddEvent, '/events/new')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
