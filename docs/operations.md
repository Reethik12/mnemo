# Operational Guide: Mnemo Production Infrastructure

This guide outlines deployment, containerization, configuration, backups, and disaster recovery strategies for Mnemo.

## 1. Local Development Stack

To spin up backend dependencies (PostgreSQL + pgvector + Redis) locally, execute:

```bash
docker compose -f docker-compose.dev.yml up -d
```

To shut down the development stack:

```bash
docker compose -f docker-compose.dev.yml down
```

## 2. Production Docker Build

The application leverages a multi-stage Docker build producing an optimized standalone Next.js image.

To build the image:

```bash
docker build -t mnemo:latest .
```

To run the full stack:

```bash
docker compose up -d
```

## 3. Database Migrations

Prisma schemas are applied using:

```bash
npx prisma db push
```

For production environments, ensure you perform migrations via a CI job or run migrations inside the container:

```bash
docker compose exec app npx prisma db push
```

## 4. Backups and Disaster Recovery

### PostgreSQL Backups

Schedule regular automated database dumps:

```bash
docker compose exec db pg_dump -U postgres mnemo > backup_$(date +%F).sql
```

### PostgreSQL Restores

To restore a backup dump to a fresh instance:

```bash
docker compose exec -T db psql -U postgres mnemo < backup_target.sql
```

### Rollback Strategy

In the event of a deployment failure:

1. Re-tag/pull the previously working Docker image.
2. If schema rollbacks are required, revert schema changes and sync Prisma.
3. Deploy the container image utilizing a rolling deployment (zero-downtime transition) through AWS ECS, Railway, or Kubernetes.
