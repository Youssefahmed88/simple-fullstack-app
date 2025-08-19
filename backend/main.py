from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# ---- CORS Middleware ----
origins = [
    "http://localhost:3000",  # React dev server
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- Pydantic Model ----
class User(BaseModel):
    id: int
    name: str
    email: str
    phone: str

# ---- In-memory database ----
users_db: List[User] = [
    User(id=1, name="Leanne Graham", email="Sincere@april.biz", phone="1-770-736-8031"),
    User(id=2, name="Ervin Howell", email="Shanna@melissa.tv", phone="010-692-6593"),
]

# ---- Routes ----
@app.get("/users", response_model=List[User])
def get_users():
    return users_db

@app.post("/users", response_model=User)
def add_user(user: User):
    # Check duplicate ID
    if any(u.id == user.id for u in users_db):
        raise HTTPException(status_code=400, detail="User with this ID already exists")
    users_db.append(user)
    return user

@app.get("/users/{user_id}", response_model=User)
def get_user(user_id: int):
    for u in users_db:
        if u.id == user_id:
            return u
    raise HTTPException(status_code=404, detail="User not found")

@app.put("/users/{user_id}", response_model=User)
def update_user(user_id: int, updated_user: User):
    for index, u in enumerate(users_db):
        if u.id == user_id:
            users_db[index] = updated_user
            return updated_user
    raise HTTPException(status_code=404, detail="User not found")

@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    for index, u in enumerate(users_db):
        if u.id == user_id:
            users_db.pop(index)
            return {"detail": "User deleted"}
    raise HTTPException(status_code=404, detail="User not found")
