from flask import Flask
from flask import request
from config import OPENAI_API_KEY
import openai


messages = []

app = Flask(__name__)
client = openai.Client(api_key= OPENAI_API_KEY)

global context
global file_text
previous_questions_and_answers = []
MAX_CONTEXT_QUESTIONS = 10

def make_query(msg: str):
    messages.append({ "role": "user", "content": msg })
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages= messages,
        temperature=0.33,
        max_tokens=600,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
        )
    message = response.choices[0].message
    messages.append(message)
    return message.content



@app.route('/upload', methods=['POST'])
def upload_file():
    #if 'file' not in request.files:
    #    return 'No file selected', 400
    f = request.files['file']
    file_text = f.read()
    print(f"File Content {file_text.decode()}")
    messages.append({"role":"system", "content": "That's the dataset" + file_text.decode()})
    return("File uploaded")
    


@app.route('/get_response', methods=['GET'])
def call_api():

    #Check if there is text to process
    #if not file_text:
    #    return 'No file selected, use POST /upload to upload it', 400

    # build the messages
    question = str(request.data.decode())
    print("question: " + question)
    
    gpt_response = make_query(question)

    # Puedes manejar la respuesta generada aquí
    print('GPT ANSWER:', gpt_response)

    return (gpt_response)


@app.route("/")
def hello_world():
    return "<p>Welcome To Our Project!</p>"

if __name__ == '__main__':
    previous_questions_and_answers = [""]
    app.run(debug=True)