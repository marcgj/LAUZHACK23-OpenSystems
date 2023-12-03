from config import *
import telebot
import requests
import json

bot = telebot.TeleBot(TELEGRAM_TOKEN)

@bot.message_handler(commands=["start"])
def cmd_start(message):
    print ("Started Bot")
    bot.send_message(message.chat.id, "I'm ready to help you!")


def doRequest(method, url, data):
    response = requests.request(method=method,url=SERVERURL + url, json=data)
    print ("-----")
    print (response.status_code)
    print ("-----")
    print("LOG RESPUESTA: Code: " + str(response.status_code) + "; Message: " + response.text + ";")
    return response.text

@bot.message_handler(content_types=["text"])
def actions(message):

    query = message.text
    response = doRequest("GET", "/get_response", {"query":query})
    send_response  = json.loads(response)
    send_response = send_response["response"]
    bot.send_message(message.chat.id, send_response)

if __name__ == '__main__':
    bot.infinity_polling()