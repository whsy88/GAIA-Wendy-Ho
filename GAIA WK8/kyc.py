import os
import base64
import streamlit as st
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# Load environment variables
load_dotenv()

# Initialize Gemini Multimodal LLM
llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite", 
    api_key=os.getenv("GEMINI_API_KEY")
)

# Automated Extraction Prompt
prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "You are an expert document scanner and OCR engine."),
        ("human",
            [
                {
                    "type": "text", 
                    "text": "Extract all readable text from this identity card. "
                            "Format it clearly as a bulleted list showing fields like Name, Date of Birth, Race, Sex, and ID Number."
                },
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

chain = prompt | llm | StrOutputParser()

# App Title
st.title("Automated ID Details Extractor")

# File Uploader
uploaded_file = st.file_uploader("Upload your ID document", type=["jpg", "png"])

if uploaded_file is not None:
    image_bytes = uploaded_file.read()
    
    # Display the uploaded image
    st.image(image_bytes, caption="Uploaded Document", use_column_width=True)
    
    # Encode and process instantly
    image = base64.b64encode(image_bytes).decode()
    
    with st.spinner("Scanning card and extracting details automatically..."):
        res = chain.invoke({
            "image": image,
            "mime_type": uploaded_file.type
        })
        
        st.subheader("Extracted Information")
        st.write(res)
