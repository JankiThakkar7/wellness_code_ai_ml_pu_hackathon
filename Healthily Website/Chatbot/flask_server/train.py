import json
import string
import numpy as np
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from model import NeuralNet
from nltk_utils import tokenize, stem, bag_of_words
from nltk.corpus import stopwords
import pandas as pd

class ChatDataset(Dataset):
    def __init__(self, X_train, y_train):
        self.n_samples = len(X_train)
        self.x_data = X_train
        self.y_data = y_train

    def __getitem__(self, index):
        return self.x_data[index], self.y_data[index]

    def __len__(self):
        return self.n_samples

def main():
    df = pd.read_csv('intents_cleaned.csv', encoding='utf-8')

    all_words = []
    tags = []
    xy = []

    stop_words = set(stopwords.words('english'))
    print("Stop_words", stop_words)

    for _, row in df.iterrows():
        tag = row['tag']
        responses = row['responses']
        pattern = row['pattern']
        if isinstance(tag, str):  # Ensure the tag is a string
            tags.append(tag)

            # Process patterns
            w = tokenize(pattern)
            w = [word for word in w if word.lower() not in stop_words]
            all_words.extend(w)
            xy.append((w, tag))

    ignore_words = ['?', '!', '.', ',', '--', '-', '(', ')', '/', '']
    all_words = [stem(w) for w in all_words if w not in ignore_words]
    all_words = sorted(set(all_words))
    tags = sorted(set(tags))

    print("All words after removing ignore words:", all_words)
    print()

    X_train = []
    y_train = []

    for (pattern_sentence, tag) in xy:
        bag = bag_of_words(pattern_sentence, all_words)
        X_train.append(bag)
        label = tags.index(tag)
        y_train.append(label)

    X_train = np.array(X_train)
    y_train = np.array(y_train)

    print("Data prepared for training")

    
    batch_size = 64
    hidden_size = 512  # Example of increasing hidden size
    output_size = len(tags)
    input_size = len(X_train[0])
    learning_rate = 0.0001
    num_epochs = 700

    dataset = ChatDataset(X_train, y_train)
    train_loader = DataLoader(dataset=dataset, batch_size=batch_size, shuffle=True, num_workers=2)

    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = NeuralNet(input_size, hidden_size, output_size).to(device)

    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate, weight_decay=1e-5)

    print("Starting training...")
    scheduler = torch.optim.lr_scheduler.StepLR(optimizer, step_size=100, gamma=0.1)
    for epoch in range(num_epochs):
        model.train()
        total_correct = 0
        total_samples = 0

        for i, (words, labels) in enumerate(train_loader):
            words = words.to(device).float()
            labels = labels.to(device).long()

            outputs = model(words)
            loss = criterion(outputs, labels)

            # Calculate accuracy
            _, predicted = torch.max(outputs, dim=1)
            correct = (predicted == labels).sum().item()
            total_correct += correct
            total_samples += labels.size(0)

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

        scheduler.step()
        accuracy = total_correct / total_samples * 100
        if (epoch + 1) % 10 == 0:
            print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {loss.item():.4f}, Accuracy: {accuracy:.2f}%')

    print(f'Final loss: {loss.item():.4f}, Final accuracy: {accuracy:.2f}%')

    print(f'Final loss: {loss.item():.4f}')

    data = {
        "model_state": model.state_dict(),
        "input_size": input_size,
        "output_size": output_size,
        "hidden_size": hidden_size,
        "all_words": all_words,
        "tags": tags
    }
    FILE = "data1.pth"
    torch.save(data, FILE)
    print(f'Training complete. File saved to {FILE}')


if __name__ == '__main__':
    import multiprocessing
    multiprocessing.freeze_support()  # This line is necessary in Windows
    main()


