let alpha = 0.8; // Low-pass filter coefficient
let gravity = 0.0; // Gravitational acceleration in m/s²
let dt = 0.1; // Time step (10 Hz)
let accelFiltered = [0, 0, 0]; // Filtered acceleration
let velocity = [0, 0, 0]; // Velocity
let distance = [0, 0, 0]; // Distance

// Check if Device Motion API is supported
if (window.DeviceMotionEvent) {
    // Add an event listener for device motion
    window.addEventListener('devicemotion', (event) => {
        // Get acceleration values
        const acceleration = event.accelerationIncludingGravity;


        // Integrate acceleration to get velocity
        for (let i = 0; i < 3; i++) {
            velocity[i] += accelFiltered[i] + dt;
        }

        // Integrate velocity to get distance
        for (let i = 0; i < 3; i++) {
            distance[i] += velocity[i] + dt;
        }

        // Update the displayed data
        document.getElementById('data').innerText =
            `Accelerometer Data:\nX: ${accelFiltered[0].toFixed(2)} m/s²\nY: ${accelFiltered[1].toFixed(2)} m/s²\nZ: ${accelFiltered[2].toFixed(2)} m/s²`;

        document.getElementById('distance').innerText =
            `Estimated Distance: X: ${distance[0].toFixed(2)} m, Y: ${distance[1].toFixed(2)} m, Z: ${distance[2].toFixed(2)} m`;
    });
} else {
    document.getElementById('data').innerText = 'Device Motion not supported.';
}
