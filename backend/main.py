from fastapi import FastAPI, HTTPException
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

ContactList = []
class ContactEmails():
    def __init__(self):
        self.Emaildict = {
            'name': None,
            'email': None
        }
    def AddEmail(self):
        ContactList.append(self.Emaildict)

# Initialize the model
temp_model = TempModel()
demand_model = DemandModel()
flu_model = FluModel()



@app.get("/")
async def root():
    return {"message": "Welcome to the Prediction API"}

@app.get("/predict/temp/{year}/{month}/{dayofyear}")
async def predict_temp(year: int, month: int, dayofyear: int):    
    if month < 1 or month > 12:
        raise HTTPException(status_code=400, detail="Month must be between 1-12")
    elif dayofyear < 1 or dayofyear > 31:
        raise HTTPException(status_code=400, detail="Day must be between 1-31")
    elif year < 1900 or year > 2099:
        raise HTTPException(status_code=400, detail="Year must be between 1900 - 2099")

    min_temp = temp_model.predict(year, month, dayofyear)[0]  # Assuming it returns a list with min_temp
    max_temp = temp_model.predict(year, month, dayofyear)[1]  # Assuming it returns a list with max_temp
    return {"min_temp": min_temp, "max_temp": max_temp}  # Return both as JSON

@app.get("/predict/demand/{min_temp}/{max_temp}/{year}/{month}/{dayofyear}")
async def predict_demand(min_temp: float, max_temp: float, year: int, month: int, dayofyear: int):

    if month < 1 or month > 12:
        raise HTTPException(status_code=400, detail="Month must be between 1-12")
    elif dayofyear < 1 or dayofyear > 31:
        raise HTTPException(status_code=400, detail="Day must be between 1-31")
    elif year < 1900 or year > 2099:
        raise HTTPException(status_code=400, detail="Year must be between 1900 - 2099")
    elif (min_temp < -10 or min_temp > 50):
        raise HTTPException(status_code=400, detail="Max temperature must be between -10 and 50")
    elif (max_temp < -10 or  max_temp > 50):
        raise HTTPException(status_code=400, detail="Max temperature must be between -10 and 50")
    
    demand = demand_model.predict(min_temp,max_temp,year,month,dayofyear)
    return {'demand': demand}

@app.get("/predict/cases/{season}/{year}/{month}")
async def predict_cases(season: str, year: int, month: int):
    if month < 1 or month > 12:
        raise HTTPException(status_code=400, detail="Month must be between 1-12")
    elif year < 1900 or year > 2099:
        raise HTTPException(status_code=400, detail="Year must be between 1900 - 2099")
    
    cases = flu_model.predict(season,year,month)
    return {'cases': cases}

@app.post("/contact_us_emails/{name}/{email}")
async def add_email(name: str, email: str):
    new_contact = ContactEmails()
    new_contact.Emaildict['name'] = name
    new_contact.Emaildict['email'] = email
    new_contact.AddEmail()

@app.get("/contact_us_emails/{name}/{email}")
async def get_emails():
    return {'contact_list': ContactList}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)
