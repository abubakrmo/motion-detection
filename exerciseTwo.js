var deviceMoveCountTwo = 0;
var hasExceededThresholdTwo = false;
//ASK USER FOR PERMISSION TO ACCESS DEVICE ORIENTATION AND MOTION DATA
function requestForUserPermissionTwo() {
    //ORIENTATION EVENT
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(function (state) {
            if (state === 'granted') {
                window.addEventListener('deviceorientation', handleOrientation);
                function handleOrientation(event) {
                    var alpha = event.alpha;
                    var beta = event.beta;
                    var gamma = event.gamma;
                    var currentAlpha = Math.round(alpha);
                    var currentBeta = Math.round(beta);
                    var currentGamma = Math.round(gamma);
                    // Display data in webpage
                    document.getElementById('alpha').innerHTML = "Alpha: ".concat(currentAlpha);
                    document.getElementById('beta').innerHTML = "Beta: ".concat(currentBeta);
                    document.getElementById('gamma').innerHTML = "Gamma: ".concat(currentGamma);
                    if (currentBeta <= 0 && !hasExceededThresholdTwo) {
                        deviceMoveCountTwo++;
                        hasExceededThresholdTwo = true;
                        var displayCountTwo = document.getElementById('movecountTwo');
                        displayCountTwo.innerHTML = "".concat(deviceMoveCountTwo);
                    }
                    else if (currentBeta > 60 && hasExceededThresholdTwo) {
                        hasExceededThresholdTwo = false;
                    }
                }
            }
            else {
                console.error('Request to access the orientation was rejected');
            }
        })
            .catch(console.error);
    }
    else {
        // Devices that do not require permission
        window.addEventListener('deviceorientation', handleOrientation);
        function handleOrientation(event) {
            var alpha = event.alpha;
            var beta = event.beta;
            var gamma = event.gamma;
            //Round up orientation data for easy readability
            var currentAlpha = Math.round(alpha);
            var currentBeta = Math.round(beta);
            var currentGamma = Math.round(gamma);
            // Display data in webpage
            document.getElementById('alpha').innerHTML = "Alpha: ".concat(currentAlpha);
            document.getElementById('beta').innerHTML = "Beta: ".concat(currentBeta);
            document.getElementById('gamma').innerHTML = "Gamma: ".concat(currentGamma);
            if (currentBeta <= 0 && !hasExceededThresholdTwo) {
                deviceMoveCountTwo++;
                hasExceededThresholdTwo = true;
                var displayCountTwo = document.getElementById('movecountTwo');
                displayCountTwo.innerHTML = "".concat(deviceMoveCountTwo);
            }
            else if (currentBeta > 60 && hasExceededThresholdTwo) {
                hasExceededThresholdTwo = false;
            }
        }
    }
}
function refreshTwo() {
    window.location.reload();
}
