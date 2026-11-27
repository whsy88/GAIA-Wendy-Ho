from fastapi import FastAPI, Body

app = FastAPI()

BOOKS = [
    {"title": "Fourth Wing", "author": "Rebecca Yarros", "published_year": 2023},
    {"title": "On Freedom", "author": "Timothy Snyder", "published_year": 2024},
    {"title": "It Starts with Us", "author": "Colleen Hoover", "published_year": 2022},
    {"title": "The Book of Bill", "author": "Alex Hirsh", "published_year": 2024},
    {"title": "On Tyranny", "author": "Timothy Snyder", "published_year": 2017},
]

# --- GET ENDPOINTS ---

@app.get("/")
async def read_root():
    return {"message": "Hello World!"}


@app.get("/books")
async def get_all_books():
    return BOOKS


# Find Book by Title - Path Parameter (Slide 23)
@app.get("/books/{book_title}")
async def get_book(book_title: str):
    for book in BOOKS:
        if book.get("title").casefold() == book_title.casefold():
            return book
    return "Book Not Found"


# Find Book by Author & Year - Query Parameters (Slide 28 & 30)
@app.get("/books/")
async def get_book_by_query(author: str, published_year: int = None):
    books_to_return = []
    for book in BOOKS:
        if book.get("author").casefold() == author.casefold():
            if published_year is None or book.get("published_year") == published_year:
                books_to_return.append(book)
    return books_to_return


# --- POST ENDPOINT ---

# Add New Book (Slide 33 & 34)
@app.post("/books/create_book")
async def create_book(new_book=Body()):
    BOOKS.append(new_book)
    return "Book Record Created Successfully!"


# --- PUT ENDPOINT ---

# Update Old Book (Slide 39 & 43)
@app.put("/books/update_book")
async def update_book(updated_book=Body()):
    for i in range(len(BOOKS)):
        if BOOKS[i].get("title").casefold() == updated_book.get("title").casefold():
            BOOKS[i] = updated_book
            return "Book Record Updated Successfully!"
    return "Book Not Found"


# --- DELETE ENDPOINT ---

# Delete Book by Title (Slide 44)
@app.delete("/books/delete_book/{book_title}")
async def delete_book(book_title: str):
    for i, book in enumerate(BOOKS):
        if book.get("title").casefold() == book_title.casefold():
            BOOKS.pop(i)
            return "Book Record Deleted Successfully!"
    return "Book Not Found"