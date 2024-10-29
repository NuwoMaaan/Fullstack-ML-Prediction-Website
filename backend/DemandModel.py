import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import  r2_score, mean_absolute_error
from sklearn.preprocessing import LabelEncoder
import joblib

electricity_data = pd.read_csv('./csvfiles/electricity_data.csv')

class DemandModel():
    def __init__(self):
        self.DemandModel = RandomForestRegressor(n_estimators=100, random_state=42)
        
    def train(self):

       
        electricity_data['date'] = pd.to_datetime(electricity_data['date'], format='%Y-%m-%d')

        data = {
            'min_temp': electricity_data['min_temperature'],
            'max_temp': electricity_data['max_temperature'],
            'demand': electricity_data['demand'],
            'date': electricity_data['date']

        }
        demand_data = pd.DataFrame(data)

        demand_data = demand_data.copy()

        demand_data.loc[:, 'Year'] = demand_data['date'].dt.year
        demand_data.loc[:, 'Month'] = demand_data['date'].dt.month
        demand_data.loc[:, 'DayOfYear'] = demand_data['date'].dt.dayofyear

        #features = [ 'min_temperature', 'max_temperature', 'year','month','dayofyear']
        x = demand_data.drop(['demand','date'], axis=1)
        y = demand_data['demand']

        self.DemandModel.fit(x, y)
        prediction = self.DemandModel.predict(x)
        
        RFr2 = r2_score(y, prediction)
        MAE = mean_absolute_error(y, prediction)
        print(f"R2: {RFr2}")
        print(f"MAE: {MAE}")

        joblib.dump(self.DemandModel, './pklfiles/DemandModel.pkl')
    
    def predict(self, min_temp, max_temp, Year, Month, Day):
        try:
            demand_model = joblib.load('./pklfiles/demandmodel.pkl')
    
            dayofyear = (pd.to_datetime(f"{Year}-{Month}-{Day}").dayofyear)
            input_data = pd.DataFrame([[min_temp, max_temp, Year, Month, dayofyear]], columns=['min_temp','max_temp','Year', 'Month', 'DayOfYear'])

            demand = demand_model.predict(input_data)[0]
            return demand
        
        except Exception as e:
            print(f"Error during prediction: {e}")
            return None

if __name__ == "__main__":
    model = DemandModel()
    model.train()

        
