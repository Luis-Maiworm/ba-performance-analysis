# ba-performance-analysis


Versions:

Local Python Version: 3.11.9
Docker Node Image: node:20
Docker Python Image: python:3.9


To setup the project do the following

If on windows: 

Execute the "init.cmd" script: > .\init.cmd

If not:

Create the template database first:

[py/python] .\setup\seed.py

Now prepare the Docker Containers:

To delete caches of previous runs:

docker compose down -v

then build and start Prometheus and Grafana:

docker compose up -d --build prometheus grafana


To execute tests:



<!-- docker compose --profile tests run --rm -e SERVICE=python k6 run --out experimental-prometheus-rw=$K6_PROMETHEUS_RW_SERVER_URL /k6/tests/readTest.js -->

Command to execute k6 tests

docker compose run --rm -e SERVICE=fastapi k6 run --out experimental-prometheus-rw=$K6_PROMETHEUS_RW_SERVER_URL "/k6/tests/rampLoad copy.js"
