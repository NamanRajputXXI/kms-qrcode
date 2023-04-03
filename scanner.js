// import { Html5Qrcode } from "html5-qrcode";
// import { Html5QrcodeScanner } from "html5-qrcode";

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
