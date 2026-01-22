// Handles input change
export const onInputChange = (setInput) => (event) => {
  setInput(event.target.value);
};

// Handles submit + API call
export const onButtonSubmit = (input, setImageUrl, setBox) => async (event) => {
  event.preventDefault();
  setImageUrl(input);

  try {
    const response = await fetch("https://clarifai-backend.onrender.com/facepp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: input })
    });

    const data = await response.json();
    console.log("Face++ response:", data);

    if (data.faces && data.faces.length > 0) {
      const image = document.getElementById("inputImage");
      const displayWidth = image.width;
      const displayHeight = image.height;
      const naturalWidth = image.naturalWidth;
      const naturalHeight = image.naturalHeight;

      const boxes = data.faces.map((face) => {
        const rect = face.face_rectangle;
        const scaleX = displayWidth / naturalWidth;
        const scaleY = displayHeight / naturalHeight;

        return {
          leftCol: rect.left * scaleX,
          topRow: rect.top * scaleY,
          width: rect.width * scaleX,
          height: rect.height * scaleY
        };
      });

      setBox(boxes);
    } else {
      console.log("No face detected");
      setBox([]);
    }
  } catch (err) {
    console.error(err);
  }
};
