let alpha = 0.8; // Low-pass filter coefficient
let gravity = 9.81; // Gravitational acceleration in m/s²
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

        // Apply low-pass filter to remove noise
        accelFiltered[0] = alpha * accelFiltered[0] + (1 - alpha) * acceleration.x;
        accelFiltered[1] = alpha * accelFiltered[1] + (1 - alpha) * acceleration.y;
        accelFiltered[2] = alpha * accelFiltered[2] + (1 - alpha) * acceleration.z;

        // Correct for gravity (assuming Z is vertical)
        accelFiltered[2] -= gravity;

        // Integrate acceleration to get velocity
        for (let i = 0; i < 3; i++) {
            velocity[i] += accelFiltered[i] * dt;
        }

        // Integrate velocity to get distance
        for (let i = 0; i < 3; i++) {
            distance[i] += velocity[i] * dt;
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
