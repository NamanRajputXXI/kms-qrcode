const kmsScanner = {
  header: function () {
    // CSS style
    function styling() {
      const style = document.createElement("style");
      style.innerHTML = `
            main {
                display: flex;
                justify-content: center;
                align-items: center;
              }
              #reader {
                width: 600px;
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
                width: 300px;
                background-color: white;
                position: fixed;
                z-index: 1000;
                filter: blur(2px);
                -webkit-animation: MoveUpDown 2s linear infinite;
              }
              
              @-webkit-keyframes MoveUpDown {
                0%,
                100% {
                  top: 350px;
                }
                50% {
                  top: 100px;
                }
              }
            `;
      document.head.appendChild(style);
    }
  },
  scannerBody: function (mainElement) {
    const scanner = document.createElement("div");
    scanner.id = "reader";
    mainElement.appendChild(scanner);

    const animatedLine = document.createElement("div");
    animatedLine.id = "animated-line";
    mainElement.appendChild(animatedLine);

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
            const html5QrCode = new Html5Qrcode(/* element id */ "reader");
            html5QrCode
              .start(
                cameraId,
                {
                  fps: 10, // Optional, frame per seconds for qr code scanning
                  qrbox: { width: 250, height: 250 }, // Optional, if you want bounded box UI
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
    startScanning();
  },
  set: function () {
    kmsScanner.header();
    kmsScanner.scannerBody(myElement);
  },
};
