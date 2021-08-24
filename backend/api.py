from flask import Flask, json, render_template, request, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tmp/test.db'
db = SQLAlchemy(app)


class PushModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    reps = db.Column(db.Integer, nullable=False)
    sets = db.Column(db.Integer, nullable=False)
    notes = db.Column(db.String(255))

    def __str__(self):
        return f'{self.name},{self.id}'

# testing a second table in same db


class PullModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

    def __str__(self):
        return f'{self.name},{self.id}'

# Leg Model


class LegModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

    def __str__(self):
        return f'{self.name},{self.id}'


@app.route('/', methods=['GET', 'POST'])
def hello_world():
    request_method = request.method
    if request.method == 'POST':
        first_name = request.form['first_name']
        return redirect(url_for('name', first_name=first_name))
    return render_template('hello.html', request_method=request_method)

# get all push workouts


@app.route('/push')
def push():
    push_list = PushModel.query.all()
    push = []
    for p in push_list:
        push.append({'id': p.id, 'name': p.name, 'reps': p.reps,
                    'sets': p.sets, 'notes': p.notes})

    return jsonify({'push': push})

# return all current push workouts


@app.route('/clear_all', methods=['POST'])
def clear_all():
    db.drop_all()
    db.create_all()
    return {'201': 'Cleared Database'}


@app.route('/add_push', methods=['POST'])
def add_push():
    print("we are here")
    push_data = request.get_json(force=True)
    new_push = PushModel(name=push_data['name'], reps=push_data['reps'],
                         sets=push_data['sets'], notes=push_data['notes'])

    db.session.add(new_push)

    try:
        db.session.commit()

    except IntegrityError:
        db.session.rollback()
        return 'Error', 403

    return 'Done', 201


@app.route('/del_push', methods=['POST'])
def del_push():
    push_data = request.get_json('id')
    #push_data = json.loads(request.data)
    push_id = push_data['id']

    PushModel.query.filter_by(id=push_id).delete()
    db.session.commit()

    return 'Done', 201


@app.route('/pull')
def pull():
    pass


@app.route('/add_pull', methods=['POST'])
def add_pull():
    pull_data = request.get_json()
    new_pull = PullModel(name=pull_data['name'])

    db.session.add(new_pull)

    try:
        db.session.commit()
    # if duplicate found return error
    except IntegrityError:
        db.session.rollback()
        return 'oops'

    return 'Done', 201


@app.route('/leg')
def leg():
    pass


@app.route('/add_leg', methods=['POST'])
def add_leg():
    leg_data = request.get_json()
    new_leg = LegModel(name=leg_data['name'])

    db.session.add(new_leg)

    try:
        db.session.commit()

    except:
        db.session.rollback()
        return 'oops'

    return 'Done', 201


@app.route('/about')
def about():
    return render_template('about.html')


if __name__ == '__main__':
    app.run(debug=True)
