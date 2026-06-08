from flask import Flask, jsonify, request
from flask_cors import CORS
from scheduler.task_manager import TaskManager
from scheduler.task import Task
from scheduler.reminders import check_reminders
from utilities.helpers import fail_message
from utilities.validation import validate_datetime, validate_reminder, validate_id, validate_string

app = Flask(__name__)
CORS(app, origins=(["http://localhost:63342"]))
manager = TaskManager()

@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = manager.get_task()
    return jsonify(tasks), 200

@app.route("/tasks/<id>", methods=["GET"])
def get_task(id):
    id = validate_id(id)
    if isinstance(id, str):
        return jsonify(fail_message(id)), 400
        
    task = manager.get_task(id)
    return jsonify(task), 200
    
@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.json
    
    start = validate_datetime(data.get("start"))
    if isinstance(start, str):
        return jsonify(fail_message(start)), 400
        
    end = validate_datetime(data.get("end"))
    if isinstance(end, str):
        return jsonify(fail_message(end)), 400
        
    reminder = validate_reminder(data.get("reminder"))
    if isinstance(reminder, str):
        return jsonify(fail_message(reminder)), 400
    
    task = Task(data.get("title"), start, end, data.get("note"), reminder)
    return jsonify(manager.add_task(task)), 201

@app.route("/tasks/<id>", methods=["PATCH"])
def update_task(id):
    data = request.json
    
    id = validate_id(id)
    if isinstance(id, str):
        return jsonify(fail_message(id)), 400
        
    new_title = validate_string(data.get("title"))
    new_start = validate_datetime(data.get("start"))
    if isinstance(new_start, str):
        return jsonify(fail_message(new_start)), 400
        
    new_end = validate_datetime(data.get("end"))
    if isinstance(new_end, str):
        return jsonify(fail_message(new_end)), 400
        
    new_note = validate_string(data.get("note"))

    if  new_title is None and new_start is None and new_end is None and new_note is None:
        return jsonify(fail_message("Values for update are not available")), 400

    return jsonify(manager.update_task(id, new_title, new_start, new_end, new_note)), 200
 
@app.route("/tasks/<id>", methods=["DELETE"])   
def remove_task(id):
    id = validate_id(id)
    if isinstance(id, str):
        return jsonify(fail_message(id)), 400
      
    return jsonify(manager.remove_task(id)), 200
    
@app.route("/tasks/reminders", methods=["GET"])
def check_reminder():
    all_task = manager.tasks
    return jsonify(check_reminders(all_task))

if __name__ == "__main__":
    app.run(port=5100, debug=True)