# Users Dashboard Fullstack App

This is a **Fullstack CRUD application** with a **React frontend** and a **FastAPI backend**.
Users can **view, add, update, and delete** users. All operations are handled by the FastAPI backend.

---

## **Frontend**

The frontend is built with **React** and **Context API** for state management.

### **Features**

* Display a list of users from the backend
* Add new users
* Update existing users
* Delete users
* State management with `UserContext`
* API integration using `fetch`

### **Getting Started (React)**

1. Go to the frontend directory:

   ```bash
   cd react-frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Run the development server:

   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app.

### **Available Scripts**

* `npm start` → Run the app in development mode
* `npm run build` → Build for production
* `npm test` → Run tests

---

## **Backend**

The backend is built with **FastAPI** and serves as an API for the frontend.

### **Features**

* REST API with CRUD routes:

  * `GET /users` → Get all users
  * `GET /users/{id}` → Get a single user
  * `POST /users` → Add a new user
  * `PUT /users/{id}` → Update a user
  * `DELETE /users/{id}` → Delete a user
* CORS enabled for React frontend
* In-memory database (can be replaced with a real database)

### **Getting Started (FastAPI)**

1. Go to the backend directory:

   ```bash
   cd fastapi-backend
   ```
2. Install dependencies:

   ```bash
   pip install fastapi uvicorn pydantic
   ```
3. Run the development server:

   ```bash
   uvicorn main:app --reload
   ```

   Open [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) to view the interactive API documentation.

---

## **Folder Structure**

```
project/
│
├── react-frontend/
│   ├── src/
│   │   ├── components/     # UserList, UserItem, UserDetails, AddUserForm
│   │   └── context/        # UserContext
│   └── package.json
│
└── fastapi-backend/
    ├── main.py             # FastAPI app with all routes
    └── requirements.txt
```

---

## **Frontend & Backend Integration**

1. React frontend sends HTTP requests (`fetch`) to FastAPI backend.
2. Backend handles CRUD operations in memory and responds with JSON.
3. Frontend updates its state based on backend responses.
4. Use **Network tab in browser DevTools** to verify requests go to backend (not just UI changes).

---

## **Component Hierarchy & Workflow**

### **1️⃣ Component Hierarchy**

* **App** → Main component that contains everything.
* **UserProvider (Context)** → Stores user data and makes it available to all child components.
* **UserList** → Fetches users from the backend and displays them.
* **UserItem** → Represents a single user in the list.
* **UserDetails** → Small component to display email and phone for a user.
* **AddUserForm** → Form to add a new user.

### **2️⃣ Workflow / Data Flow**

1. **Initialization**

   * App starts and initializes the Context that holds global user data.

2. **Fetching Users**

   * UserList requests user data from the backend (FastAPI) when it loads.
   * The returned data is stored in Context for global access.

3. **Displaying Users**

   * UserList reads users from Context and renders a UserItem for each user.
   * Each UserItem passes user details down to UserDetails to display email and phone.

4. **Adding a User**

   * AddUserForm collects new user info from the form.
   * The form updates the global Context → UserList automatically updates to show the new user.

5. **Conditional Rendering**

   * While loading or if there are no users, UserList shows appropriate messages like “Loading…” or “No users found.”

---

## **3️⃣ React Concepts in the Workflow**

| Concept                   | How It’s Applied                                                |
| ------------------------- | --------------------------------------------------------------- |
| **JSX**                   | Writing components as a mix of JavaScript + HTML                |
| **State / useState**      | Storing local or global data                                    |
| **useEffect**             | Fetching data when a component loads                            |
| **useContext**            | Sharing data across components without excessive props          |
| **Props**                 | Passing data from parent → child                                |
| **Lifting state up**      | Child component (AddUserForm) updates parent/global state       |
| **Events**                | Handling user interactions (typing, button clicks)              |
| **Lists & Keys**          | Rendering users list efficiently                                |
| **Conditional Rendering** | Displaying different UI based on loading or empty states        |
| **API Calls**             | React communicates with FastAPI backend to fetch or update data |

---

## **Notes**

* Backend uses an **in-memory database**, so all changes are lost on restart.
* To make it persistent, connect FastAPI to **SQLite, PostgreSQL, or MongoDB**.
* The frontend uses **Context API** to share state globally and **fetch** for API calls.
