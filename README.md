# juryslt

Static landing page for **Jurys Cloud Consulting** with container packaging and Kubernetes manifests suitable for ArgoCD deployment on a Rancher-managed cluster.

## Included

- Modern static site (`index.html`, `styles.css`, `script.js`)
- Container image build with Ubuntu base image (`Dockerfile`, `docker/healthz`)
- Kubernetes manifests for stage:
  - Namespace
  - Deployment
  - Service
  - Ingress
  - ArgoCD `Application`
- `k8s/kustomization.yaml` for straightforward ArgoCD sync

## Stage host

- `staging.jurys.lt`

## Build and test locally

```bash
docker build -t juryslt:local .
docker run --rm -p 8080:8080 juryslt:local
```

Open <http://localhost:8080>

## Image publishing

A GitHub Actions workflow is included at `.github/workflows/staging-image.yml`.
On pushes to `main`, it builds the Ubuntu-based container image and publishes:

- `ghcr.io/laurynasjurys/juryslt:staging`
- `ghcr.io/laurynasjurys/juryslt:sha-<commit>`

The workflow publishes the staging image to GHCR. The Kubernetes manifest stays pinned to the stable `staging` tag for a simpler deployment path.

## Manual image push

If you want to build and push manually:

```bash
docker build -t ghcr.io/laurynasjurys/juryslt:staging .
docker push ghcr.io/laurynasjurys/juryslt:staging
```

## Deploy with ArgoCD

1. Push this repository to the Git URL you intend ArgoCD to watch.
2. Update `k8s/application.yaml`:
   - `spec.source.repoURL`
   - `spec.source.targetRevision` if not using `main`
3. Apply the ArgoCD application manifest:

```bash
kubectl apply -f k8s/application.yaml
```

ArgoCD will then sync the `k8s/` directory to the cluster.

Because auto-sync is enabled, staging will deploy once:
- GitHub Actions publishes `ghcr.io/laurynasjurys/juryslt:staging`
- ArgoCD is watching this repository and the `juryslt-stage` Application exists in the cluster
- your cluster can pull from GHCR

Note: if the Deployment remains on the mutable `staging` tag, Kubernetes may not automatically restart pods on every image refresh by itself. For a fully automatic image rollout, use ArgoCD Image Updater or a manifest-update workflow later.

## Direct kubectl deployment

If you want to apply the manifests without ArgoCD first:

```bash
kubectl apply -k k8s
```

## Notes / assumptions

- Ingress class is set to `traefik` for the k3s/Rancher stage deployment.
- TLS is configured through cert-manager using `cert-manager.io/cluster-issuer: letsencrypt-prod` and secret `juryslt-staging-tls`.
- The ArgoCD `Application` assumes ArgoCD runs in the `argocd` namespace.
- The manifests target a stage namespace named `juryslt-stage`.
- `staging.jurys.lt` is scoped only to this application via its dedicated Ingress host rule.
