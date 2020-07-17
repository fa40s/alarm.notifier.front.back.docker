FROM python:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN pip3 install --no-cache-dir -r requirements.txt

EXPOSE 1337

CMD ["python3", "server.py"]
