FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Static site content
COPY index.html /app/index.html
COPY services.html /app/services.html
COPY pilots.html /app/pilots.html
COPY about.html /app/about.html
COPY contact.html /app/contact.html
COPY styles.css /app/styles.css
COPY main.js /app/main.js

# Health check script
COPY docker/healthz /app/healthz
RUN chmod +x /app/healthz

EXPOSE 8080

# Serve the static site. Directory listing is disabled for hygiene.
CMD ["python3", "-m", "http.server", "8080", "--directory", "/app"]
