from fastapi import FastAPI, Depends, Path, HTTPException
import models
from models import Todos
from database import engine, SessionLocal
from typing import Annotated
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

class TodoRequest(BaseModel):
    title: str = Field(min_length=3, max_length=100)
    description: str = Field(min_length=3, max_length=300)
    completed: bool = False

# Read All Todos
@app.get("/todos")
async def read_all(db: db_dependency):
    return db.query(Todos).all()

# Read Todo by ID
@app.get("/todos/{todo_id}")
async def get_todo_by_id(db: db_dependency, todo_id: int = Path(gt=0)):
    todo_result = db.query(Todos).filter(Todos.id == todo_id).first()
    if todo_result is not None:
        return todo_result
    raise HTTPException(status_code=404, detail="Todo not found")

# Create Todo
@app.post("/todos")
async def create_todo(db: db_dependency, todo_request: TodoRequest):
    new_todo = Todos(**todo_request.dict())
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return {"message": "Todo successfully added"}

# Update Todo
@app.put("/todos/{todo_id}")
async def update_todo(db: db_dependency, 
                      todo_id: int, 
                      todo_request: TodoRequest):
    todo_result = db.query(Todos).filter(Todos.id == todo_id).first()
    
    if todo_result is None:
        raise HTTPException(status_code=404, detail="Todo not found")

    todo_result.title = todo_request.title
    todo_result.description = todo_request.description
    todo_result.completed = todo_request.completed

    db.add(todo_result)
    db.commit()
    return {"message": "Todo successfully updated"}

# Delete Todo
@app.delete("/todos/{todo_id}")
async def delete_todo(db: db_dependency, todo_id: int = Path(gt=0)):
    todo_result = db.query(Todos).filter(Todos.id == todo_id).first()
    
    if todo_result is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    db.delete(todo_result)
    db.commit()
    return {"message": "Todo successfully deleted"}