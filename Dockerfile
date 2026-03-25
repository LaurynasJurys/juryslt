FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY index.html /app/index.html
COPY styles.css /app/styles.css
COPY script.js /app/script.js
COPY docker/healthz /app/healthz

RUN chmod +x /app/healthz

EXPOSE 8080

CMD ["python3", "-m", "http.server", "8080", "--directory", "/app"]
