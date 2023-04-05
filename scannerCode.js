const kmsScanner = {
  header: function () {
    
    // function to create the CSS style tag
    function styling() {
      const style = document.createElement("style");
      style.innerHTML = `
            *{
                margin: 0;
                padding: 0;
            }
            main {
                display: flex;
                justify-content: center;
                align-items: center;
                overflow-y: hidden;
                height: auto;
              }
              #reader {
                width: 100vw;
                height: 100vh;
                overflow-y: hidden;
              }
              #result {
                text-align: center;
                font-size: 1.5rem;
              }
              #qr-shaded-region div:nth-child(1) {
                width: 50% !important;
              }
              #qr-shaded-region div:nth-child(2) {
                width: 50% !important;
              }
              #qr-shaded-region div:nth-child(3) {
                width: 50% !important;
              }
              #qr-shaded-region div:nth-child(4) {
                width: 50% !important;
              }
              #qr-shaded-region div:nth-child(5) {
                height: 50% !important;
              }
              #qr-shaded-region div:nth-child(6) {
                height: 55% !important;
              }
              #qr-shaded-region div:nth-child(7) {
                height: 55% !important;
              }
              #qr-shaded-region div:nth-child(8) {
                height: 50% !important;
              }
              
              #animated-line {
                height: 4px;
                width: 600px;
                background-color: white;
                position: fixed;
                z-index: 1000;
                filter: blur(2px);
                -webkit-animation: MoveUpDown 2s linear infinite;
              }
              
              @-webkit-keyframes MoveUpDown {
                0%,
                100% {
                  top: 83%;
                }
                50% {
                  top: 17%;
                }
              }
            `;
      document.head.appendChild(style);
    }
    // calls function to append the styling to the body of the html page
    styling()
  },
  scannerBody: function (mainElement) {
    // implements the scanner body
    const scanner = document.createElement("div");
    scanner.id = "reader";
    mainElement.appendChild(scanner);

    // animated line which moves up and down on the scanner
    // the styling used in the following code needs to be adjusted according to screen sizes since we have used "fixed" position
    const animatedLine = document.createElement("div");
    animatedLine.id = "animated-line";
    mainElement.appendChild(animatedLine);


    const html5QrCode = new Html5Qrcode( /* element id */ "reader");
    // scanner functionality code
    function startScanning() {
        Html5Qrcode.getCameras()
            .then((devices) => {
                /**
                 * devices would be an array of objects of type:
                 * { id: "id", label: "label" }
                 */
                if (devices && devices.length) {
                    var cameraId = devices[0].id;
                    // .. use this to start scanning.

                    html5QrCode
                        .start(
                            cameraId, {
                                fps: 10, // Optional, frame per seconds for qr code scanning
                                qrbox: { width: 500, height: 800 }, // Optional, if you want bounded box UI
                            },
                            (decodedText, decodedResult) => {
                                // do something when code is read
                                // document.getElementById("result").innerHTML = `
                                // <h2>Success!</h2>
                                // <p><a href="${decodedResult}">${decodedResult}</a></p>`;
                                console.log(decodedText);
                                console.log(decodedResult);
                            },
                            (errorMessage) => {
                                // parse error, ignore it.
                                // console.error(errorMessage);
                            }
                        )
                        .catch((err) => {
                            // Start failed, handle it.
                            //   console.log(err);
                        });
                }
            })
            .catch((err) => {
                // handle err
                // console.log(err);
            });
    }

    function handleDrop(event) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageData = event.target.result;
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0, img.width, img.height);
                const imageData = context.getImageData(0, 0, img.width, img.height);

                // const jsQR = window.jsQR;

                const code = jsQR(imageData.data, imageData.width, imageData.height);
                if (code) {
                    html5QrCode.stop();
                    console.log(code.data);
                } else {
                    console.log("No QR code found.");
                }
            };
            img.src = imageData;
        };
        reader.readAsDataURL(file);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    scanner.addEventListener("drop", handleDrop);
    scanner.addEventListener("dragover", handleDragOver);

    //starts scanning
    startScanning();
  },
  set: function () {
    // calls functions on loading the page

    // to set the css on the head tag of the html page
    kmsScanner.header();

    // to set the body of the scanner with its functionality
    kmsScanner.scannerBody(myElement);
  },
};
