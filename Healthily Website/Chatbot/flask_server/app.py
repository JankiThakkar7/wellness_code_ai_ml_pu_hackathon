from flask import Flask, request, jsonify
from chat import get_response  # Ensure this is your chatbot logic
from flask_cors import CORS
# from skin_disease_classifier import SkinDiseaseClassifier
import io
from PIL import Image

app = Flask(__name__)
CORS(app)

# Initialize the classifier with the model path
# classifier = SkinDiseaseClassifier('model.h5')

@app.get("/")
def home():
    return "Hello World"

@app.post("/predict")
def predict():
    text = request.get_json().get("message")
    response = get_response(text)
    message = {"answer": response}
    print(message)
    return jsonify(message)

@app.post("/classify-image")
def classify_image():
    if "image" not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files["image"]
    image = Image.open(io.BytesIO(file.read()))
    # prediction = classifier.predict(image)

    # return jsonify({"prediction": prediction})

if __name__ == "__main__":
    app.run(debug=True, port=8000, host='0.0.0.0')
