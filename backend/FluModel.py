import pandas as pd
from xgboost import XGBRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import joblib

file_path = './csvfiles/influenza_weekly.csv'
influenza_data = pd.read_csv(file_path)


class FluModel():
    def __init__(self):
        self.FluModel = XGBRegressor(objective='reg:squarederror', n_estimators=1000, max_depth=3, random_state=42)
        self.season_mapping = {
            'summer': 0,  # December, January, February
            'autumn': 1,  # March, April, May
            'winter': 2,  # June, July, August
            'spring': 3   # September, October, November
        }

    def train(self):
        data = {
            'season': influenza_data['season'],
            'year': influenza_data['year'],
            'month': influenza_data['month'],
            'cases': influenza_data['cases']
        }
         
        cases_data = pd.DataFrame(data)
        cases_data = cases_data.copy()

        x = cases_data.drop(['cases'], axis=1) #season, year, month
        y = cases_data['cases']

        self.FluModel.fit(x, y)
        prediction = self.FluModel.predict(x)

        GBmae = mean_absolute_error(y, prediction) 
        GBRr2 = r2_score(y, prediction)

        print(f"XGBoost root Mean squared error: {GBmae}")
        print(f"XGBoost R-squared score: {GBRr2}")

        joblib.dump(self.FluModel, './pklfiles/FluModel.pkl')


    def convert_inputs(self, season):
            season_int = self.season_mapping.get(season, None)
            return season_int


    def predict(self, season, year, month):
        try:
            flu_model = joblib.load('./pklfiles/FluModel.pkl')
            # Convert inputs
            season_int = self.convert_inputs(season.lower())
            if season_int is None:
                raise ValueError("Invalid season or title input.")

            #dayofyear = (pd.to_datetime(f"{year}-{month}-{day}").dayofyear)
            input_data = pd.DataFrame([[season_int, year, month]], columns=['season','year','month'])

            cases = flu_model.predict(input_data)[0]
            return int(cases)

        except Exception as e:
            print(f"Error during prediction: {e}")
            return None
        

if __name__ == "__main__":
    model = FluModel()
    model.train()