FROM python:3.9

WORKDIR /app

COPY be-python/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY be-python/ ./

COPY sqlite.db ./python.db

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]