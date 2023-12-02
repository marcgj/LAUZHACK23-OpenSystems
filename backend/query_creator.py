from flask import Flask
from flask import request
from config import OPENAI_API_KEY
import openai

from base64 import b64decode
from json import loads

app = Flask(__name__)
client = openai.Client(api_key=OPENAI_API_KEY)

global context
global file_text


@app.route("/upload", methods=["POST"])
def upload_file():
    global file_text

    b64 = loads(request.data)
    file_text = b64decode(b64.get("base64")).decode()
    return "File uploaded"


@app.route("/first-call", methods=["GET"])
def call_api():
    global file_text

    # Check if there is text to process
    # if not file_text:
    #    return 'No file selected, use POST /upload to upload it', 400

    response = response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": "Hello, what's your name"}],
        temperature=1,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )

    gpt_response = response.choices[0].message.content

    # Puedes manejar la respuesta generada aquí
    print("Respuesta generada por GPT-3.5:", gpt_response)

    return gpt_response


@app.route("/")
def hello_world():
    return "<p>Welcome To Our Project!</p>"


if __name__ == "__main__":
    app.run(debug=True)
