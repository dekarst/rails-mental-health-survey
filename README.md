# Mental Health Survey App

This app contains both the backend API (built with Ruby on Rails) and the frontend application (built with React and TypeScript).

## Technology
- Ruby on Rails
- Typescript
- React
- TailwindCSS
- RSpec
- Jest


## Project Structure

```
rails-react-mental-health-survey
├── backend         # Rails API (for survey submission)
├── frontend        # React app (for survey form UI)
└── README.md       # Documentation
```


## Prerequisites

Ensure the following tools are installed on your machine:
- **Node.js** (v18 or later)
- **Ruby** (v3.0 or later) and **Bundler**
- **PostgreSQL**


## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/dekarst/rails-react-mental-health-survey.git
cd rails-react-mental-health-survey
```

### 2. Set Up Environment Variables

Create `.env` files from `.env.example` in the `backend` and `frontend` folders to configure environment-specific variables.

#### Backend

Path is `backend/.env`.

```env
PORT=3001
DATABASE_HOST=db
DATABASE_USER=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=mental_health_survey
SECRET_KEY_BASE=<your_secret_key>
```

#### Frontend

Path is `frontend/.env.local`.

```env
REACT_APP_API_URL=http://localhost:3001
```

### 3. Install Dependencies

#### Backend

```bash
cd backend
bundle install
rails db:create db:migrate
```

#### Frontend

```bash
cd frontend
npm install
```


## Running the Application

### Backend

```bash
cd backend
rails server
```

The Rails server will run on `http://localhost:3001`.

### Frontend

```bash
cd frontend
npm start
```

The React app will run on `http://localhost:3000`.


## Running Tests

### Backend (RSpec)

Navigate to the `backend` folder and run RSpec tests:

```bash
cd backend
rspec
```

This will run the unit tests for the Rails API, including validation, error handling, and sensitive data encryption tests.

### Frontend (Jest)

Navigate to the `frontend` folder and run Jest tests:

```bash
cd frontend
npm test
```

This will run the unit tests for the survey form, including validation and API interaction.
