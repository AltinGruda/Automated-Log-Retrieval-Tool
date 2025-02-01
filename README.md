# Automated Log Retreival Tool

A web-based tool to automate and simplify retrieving logcat logs from an Android device using Node.js, Express, and ADBKit.

## 🚀 Features
- **Retrieve Logcat Logs**: Fetch real-time logcat logs from an Android device.
- **Filtering**: Filter logs by priority, tag, process ID (PID), keywords, or time range.
- **Web API**: RESTful endpoints for fetching logs.
- **Easy ADB Integration**: Uses ADBKit to interact with the Android Debug Bridge (ADB).

## 🛠️ Technologies Used
- **Node.js** – Backend runtime
- **Express.js** – Web framework
- **ADBKit** – ADB client library for Node.js
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

### 4. Ensure ADB is Running
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

## 🛠️ How It Works
1. The Express server initializes an ADB client (`adb.createClient()`).
2. When a request is made to `/logcat/:id`, the server opens a logcat stream.
3. Logs are filtered based on query parameters.
4. The processed logs are returned as a JSON response.

## 📌 Future Enhancements
- **Web UI** for easier log viewing
- **Log Streaming** to get live updates
- **Persistent Log Storage**

## 📜 License
This project is available under the MIT License.
