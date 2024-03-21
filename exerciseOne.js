var deviceMoveCount = 0;
var hasExceededThreshold = false;
//ASK USER FOR PERMISSION TO ACCESS DEVICE ORIENTATION DATA
function requestForUserPermission() {
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
                    if (currentBeta >= 80 && !hasExceededThreshold) {
                        deviceMoveCount++;
                        hasExceededThreshold = true;
                        var displayCount = document.getElementById('movecountOne');
                        displayCount.innerHTML = "".concat(deviceMoveCount);
                    }
                    else if (currentBeta < 80 && hasExceededThreshold) {
                        hasExceededThreshold = false;
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
        window.addEventListener('deviceorientation', handleOrientationOne);
        function handleOrientationOne(event) {
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
            if (currentBeta >= 80 && !hasExceededThreshold) {
                deviceMoveCount++;
                hasExceededThreshold = true;
                var displayCount = document.getElementById('movecountOne');
                displayCount.innerHTML = "".concat(deviceMoveCount);
            }
            else if (currentBeta < 80 && hasExceededThreshold) {
                hasExceededThreshold = false;
            }
        }
    }
}
function refreshOne() {
    window.location.reload();
}
