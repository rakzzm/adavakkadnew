# Advakkad Website

A modern, premium website built with cutting-edge design principles and deployed using Docker.

## Features

- 🎨 **Premium Design**: Modern aesthetics with vibrant colors, glassmorphism, and smooth animations
- 📱 **Fully Responsive**: Optimized for all devices and screen sizes
- ⚡ **Performance Optimized**: Lightning-fast loading with nginx and optimized assets
- 🚀 **Docker Ready**: Easy deployment with Docker and docker-compose
- 🔒 **Security Headers**: Built-in security best practices

## Quick Start with Docker

### Prerequisites

- Docker installed on your system
- Docker Compose installed

### Running the Website

1. **Build and start the container:**

   ```bash
   docker-compose up --build -d
   ```

2. **Access the website:**
   Open your browser and navigate to `http://localhost:7002`

3. **Stop the container:**
   ```bash
   docker-compose down
   ```

### Docker Commands

**View running containers:**

```bash
docker-compose ps
```

**View logs:**

```bash
docker-compose logs -f
```

**Rebuild after changes:**

```bash
docker-compose up --build -d
```

**Remove container and images:**

```bash
docker-compose down --rmi all
```

## Development

The website uses:

- **HTML5** for semantic structure
- **CSS3** with custom properties for modern styling
- **Vanilla JavaScript** for interactivity
- **Nginx** for serving static files
- **Docker** for containerization

### File Structure

```
.
├── index.html          # Main HTML file
├── styles.css          # Design system and styles
├── script.js           # Interactive functionality
├── Dockerfile          # Docker image configuration
├── docker-compose.yml  # Docker Compose setup
├── nginx.conf          # Nginx server configuration
└── README.md           # This file
```

## Port Configuration

The website runs on **port 7002** by default. To change this:

1. Edit `docker-compose.yml`
2. Modify the ports mapping: `"YOUR_PORT:80"`
3. Rebuild and restart: `docker-compose up --build -d`

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Fonts**: Google Fonts (Inter, Outfit)
- **Server**: Nginx (Alpine Linux)
- **Container**: Docker

## License

Copyright © 2026 Advakkad. All rights reserved.
