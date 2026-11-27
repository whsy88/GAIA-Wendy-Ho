import os
import base64
import streamlit as st
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# Load environment variables
load_dotenv()

# Initialize the Gemini Multimodal LLM
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",  # Enter your target Gemini model name here
    api_key=os.getenv("GEMINI_API_KEY")
)

# Define the multimodal prompt template
prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "You are a helpful assistant that can describe images."),
        ("human", 
            [
                {"type": "text", "text": "{input}"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "data:{mime_type};base64,{image}",
                    },
                },
            ],
        ),
    ]
)

# Create the LangChain processing chain
chain = prompt | llm | StrOutputParser()

# App Title
st.title("Image Analysis Using Gemini")

# Layout columns for uploading and previewing
col1, col2 = st.columns(2)

with col1:
    uploaded_file = st.file_uploader("Upload your image", type=["jpg", "png"])

with col2:
    if uploaded_file is not None:
        image_bytes = uploaded_file.read()
        st.image(image_bytes)
    else:
        st.write("Image Preview")

# User question input
question = st.text_input("Enter a question")

# Process and analyze when both requirements are met
if question and uploaded_file is not None:
    # Encode image bytes to base64 string
    image = base64.b64encode(image_bytes).decode()
    
    # Invoke the chain with required key-value inputs
    res = chain.invoke({
        "input": question, 
        "image": image, 
        "mime_type": uploaded_file.type
    })
    
    # Output the result response
    st.write(res)
