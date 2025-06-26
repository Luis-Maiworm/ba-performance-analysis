# ba-performance-analysis


<!-- docker compose --profile tests run --rm -e SERVICE=python k6 run --out experimental-prometheus-rw=$K6_PROMETHEUS_RW_SERVER_URL /k6/tests/readTest.js -->

Command to execute k6 tests

docker compose run --rm -e SERVICE=python k6 run --out experimental-prometheus-rw=$K6_PROMETHEUS_RW_SERVER_URL /k6/tests/readTest.js
