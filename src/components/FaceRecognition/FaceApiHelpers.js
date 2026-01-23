// FaceApiHelpers.js

// Handles input change
export const onInputChange = (setInput) => (event) => {
  setInput(event.target.value);
};

// ✅ Helper: calculate face location based on image dimensions
export const calculateFaceLocation = (data, image) => {
  if (!image) return [];

  const displayWidth = image.width;
  const displayHeight = image.height;
  const naturalWidth = image.naturalWidth;
  const naturalHeight = image.naturalHeight;

  return data.faces.map((face) => {
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

      // ✅ Ensure calculation happens after image is fully loaded
      if (image.complete) {
        const boxes = calculateFaceLocation(data, image);
        console.log("Boxes:", boxes);
        setBox(boxes);
      } else {
        image.onload = () => {
          const boxes = calculateFaceLocation(data, image);
          console.log("Boxes after load:", boxes);
          setBox(boxes);
        };
      }
    } else {
      console.log("No face detected");
      setBox([]);
    }
  } catch (err) {
    console.error("Error fetching Face++ API:", err);
  }
};
