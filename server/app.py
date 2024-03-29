#!/usr/bin/env python3
# Standard library imports
# Remote library imports
from flask import request, abort, make_response, jsonify, request, session, redirect, send_from_directory, url_for, flash
from werkzeug.utils import secure_filename
from werkzeug.exceptions import RequestEntityTooLarge
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api, os
# Add your model imports
from models import User, Painting, Comment, Post, Event 

app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 #16mb
app.config['ALLOWED_EXTENSIONS'] = ['.png', '.jpg', '.jpeg', '.gif']

# Views go here!
@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Users(Resource):
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

api.add_resource(Users, '/users', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')


class Paintings(Resource):
    def get(self):
        paintings = [painting.to_dict() for painting in Painting.query.all()]
        reponse = make_response(paintings, 200)
        return reponse
    
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
                image=form_json['image'],
                sold=sold_response,
            )
            db.session.add(new_painting)
            db.session.commit()
            response = make_response(new_painting.to_dict(), 201)
        except ValueError:
            response = make_response({"errors" : ["validation errors"]}, 422)
        
        return response

class PaintingsById(Resource):
    def get(self, id):
        painting = Painting.query.filter_by(id=id).first()
        if painting:
            response = make_response(painting.to_dict(), 200)
        else:
            response = make_response({"error": "Painting not found"}, 404)
        return response
    
    def patch(self, id):
        painting = Painting.query.filter_by(id=id).first()
        if painting:
            try:
                sold_response = eval(request.get_json()['sold'])
                setattr(painting, "title", request.get_json()['title'])
                setattr(painting, "materials", request.get_json()['materials'])
                setattr(painting, "width", request.get_json()['width'])
                setattr(painting, "height", request.get_json()['height'])
                setattr(painting, "price", request.get_json()['price'])
                setattr(painting, "image", request.get_json()['image'])
                setattr(painting, "sold", sold_response)

                db.session.commit()
                response = make_response(painting.to_dict(), 200)
            except ValueError:
                response = make_response({"errors": ["validation errors"]}, 400)
        else:
            response = make_response({"error": "Power not found"}, 404) 
        
        return response
    
    def delete(self, id):
        painting = Painting.query.filter_by(id=id).first()
        if not painting:
            abort(404, "The painting you were looking for was not found")
        db.session.delete(painting)
        db.session.commit()
        response = make_response("", 204)
        return response


api.add_resource(Paintings, '/paintings')
api.add_resource(PaintingsById, '/paintings/<int:id>')

class Comments(Resource):
    def get(self):
        comments = [comment.to_dict() for comment in Comment.query.all()]
        reponse = make_response(comments, 200)
        return reponse
    
    def post(self):
        try:
            form_json = request.get_json()
            new_comment = Comment(
                comment=form_json['comment'],
                date_added=form_json['date_added'],
                painting_id=form_json['painting_id'],
                user_id=form_json['user_id'],
            )
            db.session.add(new_comment)
            db.session.commit()
            response = make_response(new_comment.to_dict(), 201)
        except ValueError:
            response = make_response({"errors" : ["validation errors"]}, 422)
        
        return response

class CommentsById(Resource):
    def delete(self, id):
        comment = Comment.query.filter_by(id=id).first()
        if not comment:
            abort(404, "The comment was not found")
        db.session.delete(comment)
        db.session.commit()
        response = make_response("", 204)
        return response

api.add_resource(Comments, '/comments')
api.add_resource(CommentsById, '/comments/<int:id>')


class Posts(Resource):
    def get(self):
        posts = [post.to_dict() for post in Post.query.all()]
        reponse = make_response(posts, 200)
        return reponse
    
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

class PostsById(Resource):
    def get(self, id):
        post = Post.query.filter_by(id=id).first()
        if post:
            response = make_response(post.to_dict(), 200)
        else:
            response = make_response({"error": "Post not found"}, 404)
        return response
    
    def patch(self, id):
        post = Post.query.filter_by(id=id).first()
        if post:
            try:
                for attr in request.get_json():
                    setattr(post, attr, request.get_json()[attr])
                    db.session.commit()
                    response = make_response(post.to_dict(), 200)
            except ValueError:
                response = make_response({"errors": ["validation errors"]}, 400)
        else:
            response = make_response({"error": "Post not found"}, 404) 
        return response
    
    def delete(self, id):
        post = Post.query.filter_by(id=id).first()
        if not post:
            abort(404, "The post you were looking for was not found")
        db.session.delete(post)
        db.session.commit()
        response = make_response("", 204)
        return response

api.add_resource(Posts, '/posts')
api.add_resource(PostsById, '/posts/<int:id>')

class Events(Resource):
    def get(self):
        events = [event.to_dict() for event in Event.query.all()]
        reponse = make_response(events, 200)
        return reponse

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

class EventsById(Resource):
    def get(self, id):
        event = Event.query.filter_by(id=id).first()
        if event:
            response = make_response(event.to_dict(), 200)
        else:
            response = make_response({"error": "Post not found"}, 404)
        return response
    
    def patch(self, id):
        event = Event.query.filter_by(id=id).first()
        if event:
            try:
                for attr in request.get_json():
                    setattr(event, attr, request.get_json()[attr])
                    db.session.commit()
                    response = make_response(event.to_dict(), 200)
            except ValueError:
                response = make_response({"errors": ["validation errors"]}, 400)
        else:
            response = make_response({"error": "Event not found"}, 404) 
        return response

    def delete(self, id):
        event = Event.query.filter_by(id=id).first()
        if not event:
            abort(404, "The event you were looking for was not found")
        db.session.delete(event)
        db.session.commit()
        response = make_response("", 204)
        return response


api.add_resource(Events, '/events')
api.add_resource(EventsById, '/events/<int:id>')

# @app.route('/upload', methods=['POST', 'GET'])
# def upload_file():
#     if request.method == 'POST':
#         # check if the post request has the file part
#         if 'file' not in request.files:
#             flash('No file part')
#             return redirect(request.url)
#         file = request.files['file']
#         # If the user does not select a file, the browser submits an
#         # empty file without a filename.
#         if file.filename == '':
#             flash('No selected file')
#             return redirect(request.url)
#         if file and allowedFile(file.filename):
#             filename = secure_filename(file.filename)
#             file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#             return redirect(url_for('download_file', name=filename))
#     return

# @app.route('/upload', methods=['POST', 'GET'])
# # API to upload file
# def fileUpload():
#     if request.method == 'POST':
#         file = request.files.getlist('file')
#         for f in file:
#             filename = secure_filename(f.filename)
#             if allowedFile(filename):
#                 f.save(os.path.join(UPLOAD_FOLDER, filename))
#             else:
#                 return jsonify({'message': 'File type not allowed'}), 400
#         return jsonify({"name": filename, "status": "success"})
#     else:
#         return jsonify({"status": "failed"})

@app.route('/upload_photo', methods=['POST'])
def upload():
    try:    
        file = request.files['file']
        extension = os.path.splitext(file.filename)[1].lower()

        if file:
            filename = secure_filename(file.filename)
            file_url = f'server/uploads/{filename}'
            if extension not in app.config['ALLOWED_EXTENSIONS']:
                return 'File is not an image'
            file.save(os.path.join(
                app.config['UPLOAD_FOLDER'],
                filename
            ))
    except RequestEntityTooLarge:
        return 'File is larger than the 16MB limit' 
    
    return make_response(jsonify({"name": file_url, "status": "success"}))
    # return redirect(f"photo{file_url}")

@app.route('/serve-image/<filename>', methods=['GET'])
def serve_image(filename):
    return send_from_directory(app.config['UPLOAD_DIRECTORY'], filename)

if __name__ == '__main__':
    app.run(port=5555, debug=True)
