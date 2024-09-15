# train_model.py
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import pickle
import re

# Load and preprocess the data
data = pd.read_csv('srilanka_vehicle_data.csv')

def convert_to_numeric(value):
    value = str(value)
    value = re.sub(r'[^\d.]', '', value)
    return pd.to_numeric(value, errors='coerce')

data['Year'] = data['Year'].apply(convert_to_numeric)
data['Capacity (cc)'] = data['Capacity (cc)'].apply(convert_to_numeric)
data['Mileage (Km)'] = data['Mileage (Km)'].apply(convert_to_numeric)
data['Price (Rs)'] = data['Price (Rs)'].apply(convert_to_numeric)

# Encode categorical variables
categorical_columns = ['Brand', 'Model', 'Condition', 'Transmission', 'Fuel']
label_encoders = {}
for column in categorical_columns:
    le = LabelEncoder()
    data[column] = le.fit_transform(data[column])
    label_encoders[column] = le

# Define features and target variable
X = data.drop(columns=['Price (Rs)'])
y = data['Price (Rs)']

# Split the data
x_train, x_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestRegressor(random_state=42)
model.fit(x_train, y_train)

# Save the model and label encoders
with open('model.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)

with open('label_encoders.pkl', 'wb') as le_file:
    pickle.dump(label_encoders, le_file)

print("Model and label encoders saved successfully.")
