
FROM python:3.11-slim
WORKDIR /app
COPY . /app
COPY ../data /app/data
COPY ../sessions /app/sessions
RUN pip install pyrogram tgcrypto
CMD ["python", "auto_forward_worker.py"]
