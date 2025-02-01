# Automated Log Retreival Tool

A web-based tool to automate and simplify retrieving logcat logs from an Android device using Node.js, Express, React and ADBKit.

## 🚀 Features
- **Retrieve Logcat Logs**: Fetch real-time logcat logs from an Android device.
- **Filtering**: Filter logs by priority, tag, process ID (PID), keywords, or time range.
- **Web API**: RESTful endpoints for fetching logs.
- **Easy ADB Integration**: Uses ADBKit to interact with the Android Debug Bridge (ADB).
- **Web UI**: A React-based frontend for easier log viewing and filtering.

## 🛠️ Technologies Used
- **Node.js** – Backend runtime
- **Express.js** – Web framework
- **ADBKit** – ADB client library for Node.js
- **React.js** – Frontend library for building UI
- **Tailwind CSS** – Styling framework
- **Postman** – API testing

## 📦 Installation
### 1. Clone the Repository
```sh
git clone https://github.com/your-username/logcat-retrieval.git
cd logcat-retrieval
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Start the Server
```sh
node server.js
```

### 4. Start the Client
```sh
cd client
npm install
npm start
```

### 5. Ensure ADB is Running
Make sure you have ADB installed and running:
```sh
adb start-server
```

## 📡 API Endpoints
### 1️⃣ Get Device Logs (All Logs)
```http
GET /logcat/:id
```
#### Example:
```http
GET http://localhost:5000/logcat/emulator-5554
```

### 2️⃣ Filter Logs
| Parameter | Description |
|-----------|-------------|
| `level` | Log priority (e.g., `error`, `warn`, `info`) |
| `tag` | Filter logs by tag |
| `pid` | Process ID filter |
| `search` | Search for keywords in logs |
| `startTime` | Start time (ISO 8601 format) |
| `endTime` | End time (ISO 8601 format) |

#### Example:
Get logs for "MyApp" tagged logs with priority `error`:
```http
GET http://localhost:5000/logcat/emulator-5554?level=error&tag=MyApp
```

## 🎨 Web UI Features
- **Connect to a device** – Connect to a device via UI. (In works)
- **Advanced Filtering** – Easily apply filters using UI controls. (In works)
- **Copy & Export Logs** – Download logs in `.txt` or `.json` format. (In works)

## 🛠️ How It Works
1. The Express server initializes an ADB client (`adb.createClient()`).
2. When a request is made to `/logcat/:id`, the server opens a logcat stream.
3. Logs are filtered based on query parameters.
4. The processed logs are returned as a JSON response.
5. The React client fetches the logs and displays them in a structured format.

## 📌 Future Enhancements
- **Log Storage** – Save logs for later analysis.
- **WebSocket Integration** – Enable real-time push updates.
- **User Authentication** – Secure access to logs.

## 📜 License
This project is available under the MIT License.
