<div align="center">

# AgroSentinel

**AI-Powered Agricultural Ecosystem Monitoring Platform**

[![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white)](https://vuejs.org)
[![Element Plus](https://img.shields.io/badge/Element_Plus-2.9-409EFF?style=flat-square)](https://element-plus.org)
[![ECharts](https://img.shields.io/badge/ECharts-5-AA344D?style=flat-square&logo=apacheecharts&logoColor=white)](https://echarts.apache.org)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?style=flat-square&logo=leaflet&logoColor=white)](https://leafletjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## Overview

AgroSentinel is an intelligent agricultural ecosystem monitoring platform that integrates **multi-modal recognition**, **federated learning**, **knowledge graphs**, and **GIS mapping** into a unified dashboard. Built with Vue 3 and modern web technologies, it provides real-time ecological monitoring, AI-powered crop disease detection, distributed model training, and expert knowledge Q&A — all through an intuitive visual interface.

---

## Architecture

```mermaid
graph TB
    subgraph Frontend ["AgroSentinel (Vue 3 + Element Plus)"]
        DETECT["Multi-Modal<br/>Detection"]
        FED["Federated<br/>Learning"]
        KG["Knowledge<br/>Graph"]
        GIS["GIS Mapping"]
        DASH["Dashboard &<br/>Visualization"]
    end

    subgraph Services ["Service Layer"]
        HTTP["Axios HTTP Client"]
        AUTH["Auth Guard"]
        CHART["ECharts Engine"]
        MAP["Leaflet + Amap"]
    end

    subgraph Backend ["Backend API"]
        API["REST API"]
        AI["AI Models<br/>(Detection & NLP)"]
        FL["Federated<br/>Training Server"]
        DB[(Database)]
    end

    DETECT --> HTTP
    FED --> HTTP
    KG --> HTTP
    GIS --> MAP
    DASH --> CHART
    HTTP --> API
    AUTH --> HTTP
    API --> AI
    API --> FL
    API --> DB

    style Frontend fill:#1e293b,stroke:#334155,color:#fff
    style Services fill:#0f172a,stroke:#334155,color:#fff
    style Backend fill:#164e63,stroke:#334155,color:#fff
```

### Federated Learning Pipeline

```mermaid
graph LR
    A["Local Dataset<br/>(Edge Node)"] --> B["Local Training"]
    B --> C["Model Updates<br/>(Gradients)"]
    C --> D["Aggregation Server"]
    D --> E["Global Model"]
    E --> F["Performance<br/>Evaluation"]
    F -->|Next Round| B

    style D fill:#4D6BFF,stroke:#333,color:#fff
    style E fill:#4c1d95,stroke:#333,color:#fff
```

---

## Screenshots

### Main Dashboard
![Main Dashboard](docs/images/img_1.png)

### Multi-Modal Recognition
![Multi-Modal Recognition](docs/images/img_2.png)

### Federated Learning Monitor
![Federated Learning](docs/images/img_3.png)

### GIS Mapping & Ecological Zones
![GIS Mapping](docs/images/img_4.png)

### Knowledge Graph Q&A
![Knowledge Graph](docs/images/img_5.png)

### Performance Analysis
![Performance Analysis](docs/images/img_13.png)

<details>
<summary><strong>More Screenshots</strong></summary>

### Smart Detection Interface
![Smart Detection](docs/images/img_6.png)

### Data Visualization
![Data Visualization](docs/images/img_7.png)

### User Management
![User Management](docs/images/img_8.png)

### Agricultural Information
![Agricultural Info](docs/images/img_9.png)

### Pest & Disease Records
![Pest & Disease](docs/images/img_10.png)

### Zone Management
![Zone Management](docs/images/img_11.png)

### Detection History
![Detection History](docs/images/img_12.png)

### Expert Knowledge Base
![Expert Knowledge](docs/images/img_14.png)

### Data Upload
![Data Upload](docs/images/img_15.png)

</details>

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Vue 3 + Vue CLI 5 | Reactive UI with Composition API |
| **UI Library** | Element Plus 2.9 | Enterprise-grade component library |
| **State** | Pinia + Vuex | Global state management |
| **Routing** | Vue Router 4 | SPA navigation with auth guards |
| **Charts** | ECharts 5 + WordCloud | Data visualization & analytics |
| **Maps** | Leaflet + Amap SDK | Interactive GIS with geocoding |
| **HTTP** | Axios | REST API communication |
| **Styling** | Sass + Element Plus theme | Responsive modern design |

---

## Features

### Multi-Modal Detection
- Deep learning-based image recognition for crop diseases and ecological anomalies
- Support for multiple data formats (image, text, sensor data)
- Detection history tracking and report generation

### Federated Learning
- Distributed model training across edge nodes with privacy preservation
- Real-time training progress monitoring and convergence visualization
- Multi-model performance benchmarking and comparison

### Knowledge Graph
- Expert knowledge base for agricultural ecology
- Intelligent Q&A powered by graph-based reasoning
- Multi-format knowledge ingestion (upload & parse)
- Visual knowledge dashboard with word clouds

### GIS & Mapping
- Interactive map with Leaflet for ecological zone visualization
- Amap integration for geocoding and location services
- Agricultural distribution heatmaps and monitoring alerts
- Regional data management with multi-layer overlays

---

## Quick Start

### Prerequisites

- Node.js >= 16.0
- npm >= 8.0

### Install & Run

```bash
git clone https://github.com/Ei-Ayw/AgroSentinel.git
cd AgroSentinel

npm install
npm run serve
# Open http://localhost:8080
```

### Build for Production

```bash
npm run build
```

---

## Project Structure

```
AgroSentinel/
├── public/
│   ├── data/                  # Map data (GeoJSON)
│   └── visionDetect/         # Vision detection assets
├── src/
│   ├── api/                   # API service layer
│   │   ├── auth.js           # Authentication
│   │   ├── detection.js      # Detection endpoints
│   │   ├── federated.js      # Federated learning
│   │   ├── map.js            # GIS endpoints
│   │   └── user.js           # User management
│   ├── assets/               # Static resources & images
│   ├── components/           # Shared UI components
│   ├── router/               # Route definitions & guards
│   ├── stores/               # Pinia state stores
│   └── views/                # Page modules
│       ├── auth/             # Login & registration
│       │   └── detection/    # Detection features
│       ├── federated/        # Federated learning UI
│       ├── knowledge/        # Knowledge graph
│       ├── map/              # GIS management
│       └── user/             # User settings
├── docs/                     # Documentation & screenshots
├── package.json
└── vue.config.js
```

---

## License

This project is licensed under the [MIT License](LICENSE).
