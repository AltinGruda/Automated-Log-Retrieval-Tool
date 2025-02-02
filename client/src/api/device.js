export async function getAllLogs() {
  try {
    const response = await fetch("http://localhost:7000/device/logs/127.0.0.1");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Assuming the response is JSON
    console.log("Logs:", data);
    return data.logs;
  } catch (error) {
    console.error("Error fetching logs:", error);
  }
}
export const connectToAndroidDevice = async (input) => {
  try {
    const response = await fetch("http://localhost:7000/device/connect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Device connected: ", data);
    return data;
  } catch (error) {
    console.error("Error connecting to device: ", error);
  }
};
