import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import joblib

# Load dataset
file_path = './csvfiles/weatherAUS.csv'
weather_data = pd.read_csv(file_path)

class TempModel():
    def __init__(self):
        self.MinModel = RandomForestRegressor(n_estimators=100, random_state=42)
        self.MaxModel = RandomForestRegressor(n_estimators=100, random_state=42)
    
    def train(self):

        # Group the data by 'Location' and fill missing values with the median for that location
        weather_data['MinTemp'] = weather_data.groupby('Location')['MinTemp'].transform(lambda x: x.fillna(x.median()))
        weather_data['MaxTemp'] = weather_data.groupby('Location')['MaxTemp'].transform(lambda x: x.fillna(x.median()))

        # Data frame creation and visualistation
        data = {
            'Date': weather_data['Date'],
            'Location': weather_data['Location'],
            'MinTemp': weather_data['MinTemp'],
            'MaxTemp': weather_data['MaxTemp']
        }
        weather_df = pd.DataFrame(data)
        melb_weather_df = weather_df[(weather_df['Location'] == 'Melbourne') | (weather_df['Location'] == 'MelbourneAirport')]

        # Creating deep copy of the dataframe
        melb_weather_df = melb_weather_df.copy()

        # Converting date format
        melb_weather_df['Date'] = pd.to_datetime(melb_weather_df['Date'], format='%Y-%m-%d')

        # Extract useful features in the data
        melb_weather_df.loc[:, 'Year'] = melb_weather_df['Date'].dt.year
        melb_weather_df.loc[:, 'Month'] = melb_weather_df['Date'].dt.month
        melb_weather_df.loc[:, 'DayOfYear'] = melb_weather_df['Date'].dt.dayofyear

        # Check missing location values
        melb_weather_df = melb_weather_df.dropna(subset=['Location'])

        # Label encode the location column so it isn't a string
        label_encoder = LabelEncoder()
        melb_weather_df.loc[:, 'Location'] = label_encoder.fit_transform(melb_weather_df['Location'])

        # ----------------------------MIN TEMPERATURE-------------------------------#
        X_Min = melb_weather_df.drop(['Location','MinTemp', 'MaxTemp', 'Date'], axis=1)  #features: location, year, month, dayofyear
        Y_Min = melb_weather_df['MinTemp']
        
        # Random Forest Regressor
        self.MinModel.fit(X_Min, Y_Min)
        predictions = self.MinModel.predict(X_Min)
        min_mae = mean_absolute_error(Y_Min, predictions)
        min_r2 = r2_score(Y_Min, predictions)
        print(f"Model trained. mae: {min_mae}, R²: {min_r2}")
        joblib.dump(self.MinModel, 'MinModel.pkl')
        # ----------------------------MIN TEMPERATURE-------------------------------#

        # ----------------------------MAX TEMPERATURE-------------------------------#
        X_Max = melb_weather_df.drop(['Location','MinTemp', 'MaxTemp', 'Date'], axis=1)  #features: location, year, month, dayofyear
        Y_Max = melb_weather_df['MaxTemp']

        # Random Forest Regressor
        self.MaxModel.fit(X_Max, Y_Max)
        predictions = self.MaxModel.predict(X_Max)
        max_mae = mean_absolute_error(Y_Max, predictions)
        max_r2 = r2_score(Y_Max, predictions)
        print(f"Model trained. mae: {max_mae}, R²: {max_r2}")
        joblib.dump(self.MaxModel, './pklfiles/MaxModel.pkl')
        # ----------------------------MAX TEMPERATURE-------------------------------#
       

    def predict(self, Year, Month, Day):
        try:
            # Load the models
            min_model = joblib.load('./pklfiles/MinModel.pkl')
            max_model = joblib.load('./pklfiles/MaxModel.pkl')

            dayofyear = (pd.to_datetime(f"{Year}-{Month}-{Day}").dayofyear)
            input_data = pd.DataFrame([[Year, Month, dayofyear]], columns=['Year', 'Month', 'DayOfYear'])

            # Make predictions based on input
            min_temp = min_model.predict(input_data)[0]
            max_temp = max_model.predict(input_data)[0]
            return min_temp, max_temp
        
        except Exception as e:
            print(f"Error during prediction: {e}")
            return None, None

if __name__ == "__main__":
    model = TempModel()
    model.train()

    