from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ModelTemp import TempModel
from DemandModel import DemandModel
from FluModel import FluModel

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
flu_model = FluModel()


@app.get("/")
async def root():
    return {"message": "Welcome to the Prediction API"}

@app.get("/predict/temp/{year}/{month}/{dayofyear}")
async def predict_temp(year: int, month: int, dayofyear: int):
    # Get both min and max temperature predictions
    min_temp = temp_model.predict(year, month, dayofyear)[0]  
    max_temp = temp_model.predict(year, month, dayofyear)[1]  
    return {"min_temp": min_temp, "max_temp": max_temp}  

@app.get("/predict/demand/{min_temp}/{max_temp}/{year}/{month}/{dayofyear}")
async def predict_demand(min_temp: float, max_temp: float, year: int, month: int, dayofyear: int):
    demand = demand_model.predict(min_temp,max_temp,year,month,dayofyear)
    return {'demand': demand}

@app.get("/predict/cases/{season}/{year}/{month}")
async def predict_cases(season: str, year: int, month: int):
    cases = flu_model.predict(season,year,month)
    return {'cases': cases}
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)
