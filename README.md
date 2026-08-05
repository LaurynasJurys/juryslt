# juryslt

Static marketing website for **Jurys Cloud Consulting**, served at
**`jurys.lt`** (apex), with `www.jurys.lt` redirecting to the apex.

## Contents

- Five-page static site: `index`, `services`, `pilots`, `about`, `contact`
- `styles.css`, `main.js`
- `Dockerfile` — Ubuntu 24.04 + `python3 http.server` on port 8080
- `docker/healthz` — health-check script
- `.github/workflows/staging-image.yml` — publishes the image to GHCR on push
  to `main` (used by the K3s staging path)

## Production deployment (jurys.lt)

The production site runs as a Docker container on the Caddy host
(`host.jurys.lt`), on the shared `rag` Docker network. Caddy reverse-proxies
`jurys.lt` → `juryslt:8080` and terminates TLS (Let's Encrypt, auto-renewed).

```bash
# On host.jurys.lt, from the repo checkout:
git pull
docker build -t juryslt:latest .
docker rm -f juryslt 2>/dev/null
docker run -d --name juryslt --network rag --restart unless-stopped juryslt:latest
```

The Caddy site block lives in `/srv/rag/caddy/Caddyfile` (managed by the
`vps_caddy` Ansible role — update the role so the change survives re-provisioning):

```caddyfile
jurys.lt, www.jurys.lt {
    encode zstd gzip
    reverse_proxy juryslt:8080
}
```

> `www.jurys.lt` is listed in the same block so Caddy auto-redirects www → apex.

## Build locally

```bash
docker build -t juryslt:local .
docker run --rm -p 8080:8080 juryslt:local
```

Open <http://localhost:8080>
