FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt requirements.txt
RUN python -m pip install --upgrade pip && \
    pip install --no-cache-dir --default-timeout=120 -r requirements.txt
COPY app.py app.py
ENV PYTHONUNBUFFERED=1
EXPOSE 8000
CMD ["python", "-m", "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
