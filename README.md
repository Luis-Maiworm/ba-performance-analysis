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






# Bachelorarbeit – Performance-Analyse populärer Web-Frameworks

Dieses Repository enthält die Implementierung, Tests und Analyse einer RESTful Microservices-Architektur auf Basis von **FastAPI** und **Express.js**. Ziel ist ein vergleichender Performance-Benchmark unter kontrollierten Bedingungen mithilfe von **k6**, **Prometheus** und **Grafana**.

---

## 🔧 Versionen

| Komponente    | Versionsempfehlung          |
|---------------|------------------------------|
| Python        | ≥ 3.10                       |
| Docker        | ≥ 24.x                       |

---

## 📦 Dependencies

Following software needs to be installed on your environment:

- [Docker Desktop](https://docs.docker.com/get-started/get-docker/) *(for Docker and Docker Compose)*
- [Python, >3.9](https://www.python.org/downloads/) *(to execute the database seeding script)*

---

## 🚀 Setup guide


1. **Clone repository:**

```powershell
git clone https://github.com/DEIN-USERNAME/DEIN-REPO.git
cd YOUR-REPO
```


### Windows (via Batch-Scripts)

```powershell

```


###


http://localhost:3000/d/http_dashboard/
http://localhost:3000/d/cpu_dashboard/