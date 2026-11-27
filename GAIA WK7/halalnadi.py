import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import FewShotPromptTemplate, PromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-3.5-flash-lite", api_key=GEMINI_API_KEY)

# Capstone Use Case: User feedback for HalalNadi product scanner app
examples = [
    {"review": "The barcode scanner works instantly and verified the JAKIM halal status perfectly! Highly recommended.", "sentiment": "Positive"},
    {"review": "It kept saying product not found for my local snack. The database needs a lot more items.", "sentiment": "Negative"},
    {"review": "The interface looks decent, but the scanner takes a few tries to focus the camera.", "sentiment": "Neutral"},
    {"review": "Found haram emulsifiers in my biscuits that I missed reading myself. Lifesaver app!", "sentiment": "Positive"}
]

# Updated prompt template structure for Halal App Feedback
example_prompt = PromptTemplate(
    input_variables=["review", "sentiment"],
    template="App Feedback: {review}\nSentiment: {sentiment}"
)

# Few-shot prompt builder configuring the new use case
prompt = FewShotPromptTemplate(
    examples=examples,
    example_prompt=example_prompt,
    prefix="Analyze the user feedback sentiment for our Halal product scanner app HalalNadi.\nRespond with ONLY ONE WORD: Positive, Negative, Mixed, or Neutral.\n",
    suffix="App Feedback: {input}\nSentiment:",
    input_variables=["input"]
)

chain = prompt | llm | StrOutputParser()

# Terminal Execution Loop
print("HalalNadi Feedback Sentiment Analyzer (type 'quit' to exit)")
while True:
    review = input("Enter user feedback: ").strip()
    if not review:
        continue
    if review.lower() == 'quit':
        break
    try:
        response = chain.invoke({"input": review})
        print(response.strip())
    except Exception as e:
        print(f"Error: {e}")

print("\nProgram ended.")
