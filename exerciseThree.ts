let deviceMoveCountThree: number= 0;
let hasExceededThresholdThree: boolean = false;


//ASK USER FOR PERMISSION TO ACCESS DEVICE ORIENTATION AND MOTION DATA
function requestForUserPermissionThree() {
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

                if (currentBeta <= 0 && !hasExceededThresholdThree) {
                    deviceMoveCountThree++;
                    hasExceededThresholdThree = true;
                    let displayCountThree = document.getElementById('movecountThree');
                    displayCountThree.innerHTML = `${deviceMoveCountThree}`;
                } else if (currentBeta > 140 && hasExceededThresholdThree) {
                    hasExceededThresholdThree = false;
                }

            }


                   
            } else {
            console.error('Request to access the orientation was rejected');
            }
        })
        .catch(console.error);
    } else {
        // Devices that do not require permission
        window.addEventListener('deviceorientation', handleOrientation);
        function handleOrientation(event) {
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


            if (currentBeta <= 0 && !hasExceededThresholdThree) {
                deviceMoveCountThree++;
                hasExceededThresholdThree = true;
                let displayCountThree = document.getElementById('movecountThree')
                displayCountThree.innerHTML = `${deviceMoveCountThree}`;
            } else if (currentBeta > 140 && hasExceededThresholdThree) {
                hasExceededThresholdThree = false;
            }


        }

 
        }
    
    }


   
    function refreshThree() {
        window.location.reload();
    }