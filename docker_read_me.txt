
docker build -t front_react .
docker run --rm --name front -p 80:80 front_react


docker build -t back_python .
docker run --rm --name back -p 1337:1337 back_python
