# MLflow AI Validation App

This application provides a user-friendly web interface for an AI validation process between end users and AI engineers. It integrates with MLflow to allow stakeholders to review, validate, and provide feedback on machine learning experiments and model runs.

## Features

- View MLflow experiments and runs
- Review model metrics and parameters
- Submit validation feedback (approve, reject, or request review)
- Track validation status across experiments
- Easy integration with existing MLflow tracking servers

## Tech Stack

**Backend:**
- Node.js + Express
- Axios for MLflow API integration
- CORS enabled for frontend communication

**Frontend:**
- React with Vite
- React Router for navigation
- Axios for API calls
- Modern, responsive UI

## Prerequisites

- Node.js (v18 or higher)
- MLflow tracking server running (default: http://localhost:5000)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/QCTW/mlflow-ai-validation-app.git
cd mlflow-ai-validation-app
```

2. Install dependencies for both server and client:
```bash
npm run install-all
```

3. Configure environment variables:

**Root `.env` file:**
```bash
cp .env.example .env
```

Edit `.env` and set your MLflow tracking URI:
```
PORT=5000
MLFLOW_TRACKING_URI=http://localhost:5000
FRONTEND_URL=http://localhost:5173
```

**Client `.env` file:**
```bash
cd client
cp .env.example .env
```

Edit `client/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

### Development Mode

Run both server and client concurrently:
```bash
npm run dev
```

Or run them separately:

**Server only:**
```bash
npm run server
```

**Client only:**
```bash
npm run client
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

### Production Build

Build the client for production:
```bash
npm run build
```

## API Endpoints

### MLflow Routes

- `GET /api/mlflow/experiments` - Get all experiments
- `GET /api/mlflow/experiments/:id` - Get experiment by ID
- `POST /api/mlflow/runs/search` - Search runs
- `GET /api/mlflow/runs/:id` - Get run by ID
- `GET /api/mlflow/models/:name/versions` - Get model versions

### Validation Routes

- `POST /api/validation/submit` - Submit validation feedback
- `GET /api/validation/status/:runId` - Get validation status for a run
- `GET /api/validation/pending` - Get all pending validations

### Health Check

- `GET /api/health` - Server health check

## Project Structure

```
mlflow-ai-validation-app/
├── server/                 # Backend Express server
│   ├── routes/            # API route handlers
│   │   ├── mlflow.js      # MLflow integration routes
│   │   └── validation.js  # Validation workflow routes
│   ├── services/          # Business logic
│   │   └── mlflowService.js
│   └── server.js          # Main server file
├── client/                # Frontend React app
│   ├── src/
│   │   ├── pages/         # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   └── Validation.jsx
│   │   ├── services/      # API service layer
│   │   │   └── api.js
│   │   ├── App.jsx        # Main app component
│   │   └── App.css        # Global styles
│   └── package.json
├── .env.example           # Example environment variables
├── package.json           # Root package configuration
└── README.md             # This file
```

## Usage

1. Start your MLflow tracking server
2. Run the validation app using `npm run dev`
3. Navigate to http://localhost:5173
4. View experiments and pending validations on the dashboard
5. Click "Validate" on any run to review metrics and parameters
6. Submit validation feedback with your user ID and comments

## Validation Workflow

1. AI engineers run experiments tracked by MLflow
2. End users access the validation app to review runs
3. Users examine metrics, parameters, and model details
4. Users submit validation status:
   - **Approved**: Model is ready for deployment
   - **Rejected**: Model needs improvements
   - **Needs Review**: Requires additional evaluation
5. Validation metadata is stored as MLflow run tags
6. AI engineers can query validation status via MLflow API

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC License - see LICENSE file for details
