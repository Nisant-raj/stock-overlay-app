# 📈 Real-Time Stock Overlay Widget

A desktop always-on-top widget that displays live stock and crypto prices using Angular, Node.js, WebSockets, and Electron.

---

## 🚀 Features
- Always-on-top desktop widget
- Real-time WebSocket price streaming
- Multi-symbol support (Crypto, US Stocks)
- Secure backend gateway
- Draggable UI
- Minimize & close controls
- Market-aware updates
- Manual Angular change detection for high-frequency updates

---

## 🧱 Architecture

Angular UI (Renderer)
        ↓
Node.js WebSocket Server
        ↓
Finnhub WebSocket API
        ↓
Electron Desktop Wrapper

---

## 🛠 Tech Stack

- Angular (Standalone Components)
- Node.js
- Electron
- WebSocket (ws)
- Finnhub API
- ChangeDetectorRef

---

## 📦 Project Structure

stock-overlay-app/
│
├── frontend/ # Angular app
├── backend/ # Node.js WebSocket server
├── electron/ # Electron main process
├── package.json # Root scripts
└── README.md


---

## ▶️ Running the App

### 1️⃣ Install dependencies
npm install
cd frontend && npm install
cd ../backend && npm install
cd ../electron && npm install

## start the project
 --individual start 
        npm run backend
        npm run frontend
        npm run electron
-- all in one start (on route level folder )
        npm start 


Screenshort of the stock tracker overlay app 
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/16bc1696-558f-443f-91dd-2e56d163a1bf" />
<img width="1919" height="986" alt="image" src="https://github.com/user-attachments/assets/a69071ca-2a03-4f0a-bd2a-086b70374ef3" />
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/e0123511-7474-4cf4-ba5d-3e3ab48572f9" />

