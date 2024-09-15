from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)

# Enable CORS for all origins
CORS(app)

# Load the model and label encoders
with open('model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

with open('label_encoders.pkl', 'rb') as le_file:
    label_encoders = pickle.load(le_file)

def preprocess_input(input_data):
    input_df = pd.DataFrame([input_data])
    
    # Encode categorical columns
    for column, le in label_encoders.items():
        if column in input_df.columns:
            input_df[column] = le.transform(input_df[column])
    
    # Ensure all columns are numeric
    numeric_columns = ['Year', 'Capacity (cc)', 'Mileage (Km)']
    for col in numeric_columns:
        input_df[col] = pd.to_numeric(input_df[col], errors='coerce')
    
    return input_df

def format_price(price):
    return f"Rs {price:,.2f}"

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Welcome to the Vehicle Price Prediction API. Use the /predict endpoint to get predictions.'})

@app.route('/predict', methods=['POST'])
def predict_price():
    try:
        # Get JSON data from the request
        input_data = request.json

        # Preprocess the input data
        preprocessed_data = preprocess_input(input_data)
        
        # Predict the price
        prediction = model.predict(preprocessed_data)
        
        # Format the predicted price
        formatted_price = format_price(prediction[0])
        
        # Return the formatted price as JSON
        return jsonify({'predicted_price': formatted_price})
    
    except Exception as e:
        # Handle errors and return an error message
        return jsonify({'error': str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
