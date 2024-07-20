import random
import torch
import pandas as pd
from model import NeuralNet
from nltk_utils import bag_of_words, tokenize

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
# print(device)

# Load CSV file with error handling
try:
    df = pd.read_csv('intents_cleaned.csv', encoding='utf-8')
except FileNotFoundError:
    print("Error: The file 'intents_cleaned.csv' was not found.")
    exit(1)
except pd.errors.EmptyDataError:
    print("Error: The file 'intents_cleaned.csv' is empty.")
    exit(1)
except pd.errors.ParserError:
    print("Error: The file 'intents_cleaned.csv' could not be parsed.")
    exit(1)

def load_intents_from_csv(df):
    intents = []
    for _, row in df.iterrows():
        tag = row['tag']
        # Split responses by a delimiter (e.g., '|')
        responses = row['responses'].split('|')

        pattern = row['pattern']

        existing_intent = next((intent for intent in intents if intent['tag'] == tag), None)
        if existing_intent:
            existing_intent['patterns'].append(pattern)
            existing_intent['responses'].extend(responses)
        else:
            intents.append({
                'tag': tag,
                'patterns': [pattern],
                'responses': responses
            })
    return intents

intents = load_intents_from_csv(df)

FILE = "data1.pth"

# Load model data with error handling
try:
    data = torch.load(FILE)
except FileNotFoundError:
    print("Error: The file 'data.pth' was not found.")
    exit(1)
except RuntimeError as e:
    print(f"Error loading model data: {e}")
    exit(1)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data['all_words']
tags = data['tags']
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

bot_name = "System"

# def get_response(msg):
#     sentence = tokenize(msg)
#     X = bag_of_words(sentence, all_words)
#     X = X.reshape(1, X.shape[0])
#     X = torch.from_numpy(X).to(device)

#     output = model(X)
#     _, predicted = torch.max(output, dim=1)

#     tag = tags[predicted.item()]
#     probs = torch.softmax(output, dim=1)
#     prob = probs[0][predicted.item()]

#     # Debugging information
#     print(f"Tag: {tag}, Probability: {prob.item():.2f}")

#     # Adjusted confidence threshold
#     if prob.item() > 0.7:
#         for intent in intents:
#             if intent['tag'] == tag:
#                 return f"{random.choice(intent['responses'])} (Probability: {prob.item():.2f})"

#     return "I'm not entirely sure how to respond to that. Can you please rephrase or provide more context?"

def get_response(msg):
    sentence = tokenize(msg)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]
    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]

    # Debugging information
    print(f"Tag: {tag}, Probability: {prob.item():.2f}")

    # Adjusted confidence threshold
    if prob.item() > 0.5:  # Increase threshold
        for intent in intents:
            if tag == intent["tag"]:
                return random.choice(intent["responses"])

    return "I do not understand. Could you please rephrase?"  # Fallback response


if __name__ == "__main__":
    print("Let's chat! (type 'quit' to exit)")
    while True:
        sentence = input("You: ")
        if sentence.lower() == "quit":
            break

        resp = get_response(sentence)
        print(f"{bot_name}: {resp}")
