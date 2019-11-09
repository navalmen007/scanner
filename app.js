    import QrScanner from "./qr-scanner.min.js";
    QrScanner.WORKER_PATH = './qr-scanner-worker.min.js';

    const video = document.getElementById('qr-video');
    const camHasCamera = document.getElementById('cam-has-camera');
    const camQrResult = document.getElementById('cam-qr-result');
    const camQrResultTimestamp = document.getElementById('cam-qr-result-timestamp');
    const fileSelector = document.getElementById('file-selector');
    const fileQrResult = document.getElementById('file-qr-result');



// ##########  my code //////////##
const trig = document.getElementById('trig')


// ##########  my code //////////##


    function setResult(label, result) {
        label.textContent = result;
        camQrResultTimestamp.textContent = new Date().toString();
        label.style.color = 'teal';
        clearTimeout(label.highlightTimeout);
        label.highlightTimeout = setTimeout(() => label.style.color = 'inherit', 100);
    }

    // ####### Web Cam Scanning #######

    QrScanner.hasCamera().then(hasCamera => camHasCamera.textContent = hasCamera);

    var scanner = new QrScanner(video, result => setResult(camQrResult, result));
    //scanner.start();

    var scanner = null;

    trig.addEventListener('click', event => {     
        if(trig.textContent == 'Start'){
             scanner = new QrScanner(video, result => setResult(camQrResult, result));
    
            scanner.start();
        trig.textContent = 'Stop';        }else{
            trig.textContent = 'Start';
            scanner.destroy() ;
        }
    });

    

    document.getElementById('inversion-mode-select').addEventListener('change', event => {
        scanner.setInversionMode(event.target.value);
    });

    // ####### File Scanning #######

    fileSelector.addEventListener('change', event => {
        const file = fileSelector.files[0];
        if (!file) {
            return;
        }
        QrScanner.scanImage(file)
            .then(result => setResult(fileQrResult, result))
            .catch(e => setResult(fileQrResult, e || 'No QR code found.'));
    });

