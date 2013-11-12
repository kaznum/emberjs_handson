class TodosController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_access_control_headers

  def set_access_control_headers
    # response.headers.merge! 'Access-Control-Allow-Origin' => '*', 'Access-Control-Allow-Methods' => 'POST, PUT, GET, DELETE', 'Access-Control-Allow-Headers' => 'Origin, Accept, Content-Type'
  end

  def index
    todos = Todo.all
    render json: { todos: todos.map{ |t| {id: t.id, title: t.title, completed: t.completed, deadline: t.deadline.try(:strftime, "%Y-%m-%d") }}}.to_json, status: :ok
  end

  def create
    todo = Todo.create!(filtered_params)
    head location: todo_url(todo), status: :created
  end

  def destroy
    todo = Todo.destroy(params[:id])
    head status: :ok
  end

  def update
    todo = Todo.find(params[:id])
    todo.update!(filtered_params)
    head status: :ok
  end

  def filtered_params
    params.require(:todo).permit(:title, :completed, :deadline)
  end
end
