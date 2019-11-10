    const video = document.getElementById('qr-video');
    const camHasCamera = document.getElementById('cam-has-camera');
    const camQrResult = document.getElementById('cam-qr-result');
    const camQrResultTimestamp = document.getElementById('cam-qr-result-timestamp');
    var CamSelected = null;


// ##########  my code //////////##
const trig = document.getElementById('trig')

trig.addEventListener('click', event => {     
        if(trig.textContent == 'START'){
            
            scanner.start(CamSelected);
            
            // scanner = new QrScanner(video, result => setResult(camQrResult, result));
            //scanner.start();
            trig.textContent = 'STOP'; 
        }else{
            trig.textContent = 'START';
            scanner.stop() ;
        }
    });


function setResult(label, result) {
        label.textContent = result;
        camQrResultTimestamp.textContent = new Date().toTimeString().split(" ")[0];
        label.style.color = 'teal';
        clearTimeout(label.highlightTimeout);
        label.highlightTimeout = setTimeout(() => label.style.color = 'inherit', 100);
    }



let scanner = new Instascan.Scanner({ video:                    document.getElementById('qr-video') });

scanner.addListener('scan', function (result) {
        //console.log(result);
        setResult(camQrResult, result);  
          
      });

Instascan.Camera.getCameras().then(function (cameras) { camQrResultTimestamp.textContent = JSON.stringify(cameras)});

Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
             CamSelected = cameras[0];
             for (var i = 0, len = cameras.length; i < len; i++) {
                if (cameras[i].name.indexOf('back') != -1) {
                        CamSelected = c;
                        return false;
                }
            }
                
          //scanner.start(cameras[0]);
        } else {
          console.error('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e);
      });
