import os
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()
app = FastAPI(title="Text Translator API")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-3.8-flash", api_key=GEMINI_API_KEY)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant that translates {input_language} to {output_language}. Translate the provided text only."),
    ("human", "{text_input}")
])

chain = prompt | llm | StrOutputParser()

class TranslationRequest(BaseModel):
    input_language: str = "English"
    output_language: str = "Malay"
    text_input: str = "I like programming."

@app.post("/translate")
def translate_text(request: TranslationRequest):
    ai_msg = chain.invoke({
        "input_language": request.input_language,
        "output_language": request.output_language,
        "text_input": request.text_input
    })
    
    return {"translated_text": ai_msg}