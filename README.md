# Performance Analysis & Visualization of Web Frameworks in a RESTful Microservices Architecture

This repository contains implementations of basic CRUD microservices using **FastAPI**, and **Express.js**. 
It provides a benchmarking setup with:

- **k6** – load testing  
- **Prometheus** – metrics collection  
- **Grafana** – performance visualization  

The goal is to evaluate and compare these frameworks under various load scenarios, focusing on **latency**, **throughput**, and **resource utilization** in a microservices environment.


---

## 📦 Dependencies

Following software needs to be installed on your environment:

- [Docker Desktop](https://docs.docker.com/get-started/get-docker/) *(for Docker and Docker Compose)*
- [Python, >3.9](https://www.python.org/downloads/) *(to execute the database seeding script)*
- [Git](https://git-scm.com/downloads) *(to clone this repository)*

---

## 🚀 Setup guide

### Windows (via Batch-Scripts)

1. **Clone repository:**

```powershell
git clone https://github.com/Luis-Maiworm/ba-performance-analysis.git
cd ba-performance-analysis
```

2. **Setup the environment:**

```powershell
.\init.cmd
```


3. **Run the tests:**

```powershell
.\run_tests.cmd [rampLoad/steadyLoad] [firstFramework (express/fastapi)] [secondFramework (express/fastapi)]
```


4. **Monitor the results:**

- [CPU/RAM Usage Graphs](http://localhost:3000/d/cpu_dashboard/)
- [K6 Metrics Graphs](http://localhost:3000/d/http_dashboard_native_histograms/)
