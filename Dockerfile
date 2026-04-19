FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY index.html /app/index.html
COPY services.html /app/services.html
COPY training.html /app/training.html
COPY about.html /app/about.html
COPY blog.html /app/blog.html
COPY ai-deployment-options.html /app/ai-deployment-options.html
COPY azure-landing-zones-series.html /app/azure-landing-zones-series.html
COPY contact.html /app/contact.html
COPY styles.css /app/styles.css
COPY script.js /app/script.js
COPY docker/healthz /app/healthz

RUN chmod +x /app/healthz

EXPOSE 8080

CMD ["python3", "-m", "http.server", "8080", "--directory", "/app"]
