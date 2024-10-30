from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from ModelTemp import TempModel
from DemandModel import DemandModel

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL of React application
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the model
temp_model = TempModel()
demand_model = DemandModel()


@app.get("/")
async def root():
    return {"message": "Welcome to the Prediction API"}

@app.get("/predict/{year}/{month}/{dayofyear}")
async def predict_temp(year: int, month: int, dayofyear: int):
    # Get both min and max temperature predictions
    if month < 1 or month > 12:
        raise HTTPException(status_code=400, detail="Month must be between 1-12")
    elif dayofyear < 1 or dayofyear > 31:
        raise HTTPException(status_code=400, detail="Day must be between 1-31")
    elif year < 1900 or year > 2099:
        raise HTTPException(status_code=400, detail="Year must be between 1900 - 2099")

    min_temp = temp_model.predict(year, month, dayofyear)[0]  # Assuming it returns a list with min_temp
    max_temp = temp_model.predict(year, month, dayofyear)[1]  # Assuming it returns a list with max_temp
    return {"min_temp": min_temp, "max_temp": max_temp}  # Return both as JSON

@app.get("/predict/{min_temp}/{max_temp}/{year}/{month}/{dayofyear}")
async def predict_temp(min_temp: float, max_temp: float, year: int, month: int, dayofyear: int):
    # Get both min and max temperature predictions
    demand = demand_model.predict(min_temp,max_temp,year,month,dayofyear)
    return {'demand': demand}
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)
