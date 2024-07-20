import nltk
from nltk.stem.porter import PorterStemmer
import numpy as np

nltk.download('stopwords')
nltk.download('punkt')
from nltk.corpus import stopwords

# Initialize stemmer
stemmer = PorterStemmer()

def tokenize(sentence):
    return nltk.word_tokenize(sentence)

def stem(word):
    return stemmer.stem(word.lower())

def bag_of_words(tokenized_sentence, all_words):
    # Stem each word in the filtered sentence
    sentence_words = [stem(word) for word in tokenized_sentence]
    # Initialize bag with 0 for each word in the vocabulary
    bag = np.zeros(len(all_words), dtype=np.float32)
    for idx, w in enumerate(all_words):
        if w in sentence_words:
            bag[idx] = 1.0

    return bag
