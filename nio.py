from flask import Flask, render_template, url_for, request, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

nio = Flask(__name__)
nio.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(nio)

class foodList(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    content = db.Column(db.String(100), nullable = False)
    calories = db.Column(db.Integer)
    date_created = db.Column(db.DateTime, default = datetime.utcnow)

    def __repr__(self):
        return '<Food %r>' % self.id

@nio.route('/', methods = ['POST', 'GET'])
def index():
    if request.method == 'POST':
        food_content = request.form['content']
        new_food = foodList(content = food_content)

        try:
            db.session.add(new_food)
            db.session.commit()
            return redirect('/')
        except:
            return 'There was an issue adding your food item'

    else:
        foods = foodList.query.order_by(foodList.date_created).all()
        return render_template('index.html', foods = foods)

@nio.route('/update/<int:id>', methods = ['POST', 'GET'])
def update(id):
    food = foodList.query.get_or_404(id)

    if request.method == 'POST':
        food.content = request.form['content']

        try:
            db.session.commit()
            return redirect('/')
        except:
            return 'There was an issue updating your food item'
    else:
        return render_template('update.html', food = food)

@nio.route('/delete/<int:id>')
def delete(id):
    food_to_delete = foodList.query.get_or_404(id)

    try:
        db.session.delete(food_to_delete)
        db.session.commit()
        return redirect('/')
    except:
        return 'There a problem deleting that food item'

if __name__ == '__main__':
    nio.run(debug = True)