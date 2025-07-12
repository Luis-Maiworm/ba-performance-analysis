FROM python:3.9

WORKDIR /app

COPY be-fastapi/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY be-fastapi/ ./

COPY sqlite.db ./fastapi.db

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]