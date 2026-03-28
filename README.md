# juryslt

Static business website for `staging.jurys.lt`.

This repository contains:
- a small multi-page staging site for Jurys Cloud Consulting
- static assets (HTML, CSS, JS)
- a blog landing page placeholder
- a dedicated contact page
- an Azure Landing Zones series planning page for staging review
- Docker image build
- GitHub Actions workflow to publish the image to GHCR

Kubernetes, ArgoCD, ingress, and TLS configuration are managed from the separate `LaurynasJurys/k3s` repository.

## Build locally

```bash
docker build -t juryslt:local .
docker run --rm -p 8080:8080 juryslt:local
```

Open <http://localhost:8080>

## Published image

GitHub Actions publishes:
- `ghcr.io/laurynasjurys/juryslt:staging`
- `ghcr.io/laurynasjurys/juryslt:sha-<commit>`
