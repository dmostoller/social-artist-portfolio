from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from config import db, bcrypt


# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    name = db.Column(db.String)
    email = db.Column(db.String)
    is_admin = db.Column(db.Boolean)

    comments = db.relationship('Comment', back_populates='user', cascade='all, delete')

    serialize_rules = ('-comments.user', )
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    @validates
    def validate_username(self, key, username):
        if not username:
            raise ('You must enter a username')
        return username

    def __repr__(self):
        return f'User {self.username}, ID {self.id}'
    
class Painting(db.Model, SerializerMixin):
    __tablename__ = 'paintings'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    materials = db.Column(db.String)
    width = db.Column(db.Integer)
    height = db.Column(db.Integer)
    price = db.Column(db.String)
    fullsize = db.Column(db.String)
    image = db.Column(db.String)
    sold = db.Integer(db.Boolean)

    comments = db.relationship('Comment', back_populates='user', cascade='all, delete')

    serialize_rules = ('-comments.painting', )

    def __repr__(self):
        return f'<Painting {self.id}>'
    
class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)    
    comment = db.Column(db.String)
    date_added = db.Column(db.String)

    painting_id = db.Column(db.Integer, db.ForeignKey('paintings.id'))
    painting = db.relationship('Painting', back_populates='comments')

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='comments')

    serialize_rules = ('-painting.comments', '-user.comments')

    def __repr__(self):
        return f'<Comment {self.id}>'
    
class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    content = db.Column(db.String)
    image_url = db.Column(db.String)
    date_added = db.Column(db.String)

    def __repr__(self):
        return f'<Post {self.id}>'
    

class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    venue = db.Column(db.String)
    location = db.Column(db.String)
    details = db.Column(db.String)
    image_url = db.Column(db.String)
    event_date = db.Column(db.String)

    def __repr__(self):
        return f'<Event {self.id}>'