
# Fullstack Weather, Flu Prediction, electricity demand website

Short project combining a FastAPI backend that serves ML-based predictions and a React frontend.

What it does
- Predicts daily min/max temperature, electricity demand, and influenza cases using pre-trained models in `backend`.
- Exposes simple REST endpoints the frontend consumes.

Prerequisites
- Windows PowerShell (examples below). Python 3.11+ and Node.js (for frontend).

Backend (Python)
- From the `backend` folder you can use the provided virtual environment or create one:

```powershell
# (from project root)
cd .\backend
# create venv (if you don't have it)
python -m venv venv
.\venv\Scripts\Activate
python -m pip install --upgrade pip
# install pinned dependencies (if you already have backend\requirements.txt)
pip install -r requirements.txt
```

- Run the API (default port 8000):

```powershell
# in backend (venv active)
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API endpoints (examples)
- GET `/predict/temp/{year}/{month}/{dayofyear}` — returns min/max temperature.
- GET `/predict/demand/{min_temp}/{max_temp}/{year}/{month}/{dayofyear}` — returns demand prediction.
- GET `/predict/cases/{season}/{year}/{month}` — returns influenza case estimate.
- POST `/contact_us_emails/{name}/{email}` and GET `/contact_us_emails/` — contact list.

Frontend (React)
- From the `frontend` folder:

```powershell
cd ..\frontend
npm install
npm start

# frontend dev server usually runs on http://localhost:3000
```

Notes & troubleshooting
- Make sure your editor/terminal is using the backend venv interpreter (`backend\venv\Scripts\python.exe`).
- If imports (e.g., `pandas`) fail, reinstall in the venv:

```powershell
.\venv\Scripts\python.exe -m pip install --upgrade --force-reinstall pandas
```

