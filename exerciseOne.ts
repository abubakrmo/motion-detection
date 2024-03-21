let deviceMoveCount: number = 0;
let hasExceededThreshold: boolean = false;


//ASK USER FOR PERMISSION TO ACCESS DEVICE ORIENTATION DATA
function requestForUserPermission() {
    //ORIENTATION EVENT
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        (DeviceOrientationEvent as any).requestPermission()
        .then((state) => {
            if (state === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);

            function handleOrientation(event) {
                const alpha = event.alpha;
                const beta = event.beta;
                const gamma = event.gamma;

                const currentAlpha = Math.round(alpha);
                const currentBeta = Math.round(beta);
                const currentGamma = Math.round(gamma);
                // Display data in webpage
                document.getElementById('alpha').innerHTML = `Alpha: ${currentAlpha}`;
                document.getElementById('beta').innerHTML = `Beta: ${currentBeta}`;
                document.getElementById('gamma').innerHTML = `Gamma: ${currentGamma}`;

                if (currentBeta >= 80 && !hasExceededThreshold) {
                    deviceMoveCount++;
                    hasExceededThreshold = true;
                    let displayCount = document.getElementById('movecountOne');
                    displayCount.innerHTML = `${deviceMoveCount}`;
                } else if (currentBeta < 80 && hasExceededThreshold) {
                    hasExceededThreshold = false;
                }
            }   
            } else {
            console.error('Request to access the orientation was rejected');
            }
        })
        .catch(console.error);
    } else {
        // Devices that do not require permission
        window.addEventListener('deviceorientation', handleOrientationOne);
        function handleOrientationOne(event) {
            const alpha = event.alpha;
            const beta = event.beta;
            const gamma = event.gamma;

            //Round up orientation data for easy readability
            const currentAlpha = Math.round(alpha);
            const currentBeta = Math.round(beta);
            const currentGamma = Math.round(gamma);

            // Display data in webpage
            document.getElementById('alpha').innerHTML = `Alpha: ${currentAlpha}`;
            document.getElementById('beta').innerHTML = `Beta: ${currentBeta}`;
            document.getElementById('gamma').innerHTML = `Gamma: ${currentGamma}`;

            if (currentBeta >= 80 && !hasExceededThreshold) {
                deviceMoveCount++;
                hasExceededThreshold = true;
                let displayCount = document.getElementById('movecountOne');
                displayCount.innerHTML = `${deviceMoveCount}`;
            } else if (currentBeta < 80 && hasExceededThreshold) {
                hasExceededThreshold = false;
            }
        }
        }
    }

function refreshOne(){
    window.location.reload();
}