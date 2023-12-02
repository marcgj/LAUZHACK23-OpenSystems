from flask import Flask
from flask import request
from config import OPENAI_API_KEY
import openai
from base64 import b64decode
from json import loads


messages = []

app = Flask(__name__)
client = openai.Client(api_key=OPENAI_API_KEY)

global context
global file_text
previous_questions_and_answers = []
MAX_CONTEXT_QUESTIONS = 30

def make_query(msg: str):
    messages.append({ "role": "user", "content": msg })
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages= messages,
        temperature=0.33,
        max_tokens=1000,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
        )
    message = response.choices[0].message
    messages.append(message)
    return message.content

def set_context():
    global context
    print("setting context...")
    context = '''This is a set of LOGS from a web server, the columns are IP,Time,URL,Status
    Remember all the information from those logs, tey are also called data. I will ask you questions
    about the information that it contains. You should behave like a data analyst and I am your boss asking
    questions and giving you different tasks. Don't rush for an answer, take your time, I want final answers, 
    I shouldn't do anything, don't make me calculate anything, do it yourself. If I ask you something not related
    to the dataset answer "I just answer about the logs" .'''

    messages.append({"role":"system", "content": context + "That's the dataset" + file_text})

    print("added context")


@app.route("/upload", methods=["POST"])
def upload_file():
    global file_text

    b64 = loads(request.data)
    file_text = b64decode(b64.get("base64")).decode()
    set_context()
    return "File uploaded"


    


@app.route('/get_response', methods=['GET'])
def call_api():

    # Check if there is text to process
    # if not file_text:
    #    return 'No file selected, use POST /upload to upload it', 400

    # build the messages
    question = str(request.data.decode())
    print("question: " + question)
    
    gpt_response = make_query(question)

    # Puedes manejar la respuesta generada aquí
    print('GPT ANSWER:', gpt_response)

    return gpt_response


@app.route("/")
def hello_world():
    return "<p>Welcome To Our Project!</p>"


if __name__ == '__main__':
    previous_questions_and_answers = [""]
    app.run(debug=True)