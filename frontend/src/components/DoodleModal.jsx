import { useRef, useState } from "react";

function DoodleModal({ onSave, onClose, darkMode }) {
  const canvasRef = useRef(null);

  const [drawing, setDrawing] = useState(false);

  const [penColor, setPenColor] = useState("#000000");

  const [canvasColor, setCanvasColor] = useState("#ffffff");

  const isMobile = window.innerWidth < 640;

  function startDraw(e) {
    const canvas = canvasRef.current;

    const rect = canvas.getBoundingClientRect();

    const ctx = canvas.getContext("2d");

    ctx.beginPath();

    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);

    setDrawing(true);
  }

  function draw(e) {
    if (!drawing) return;

    const canvas = canvasRef.current;

    const rect = canvas.getBoundingClientRect();

    const ctx = canvas.getContext("2d");

    ctx.lineWidth = 3;

    ctx.lineCap = "round";

    ctx.strokeStyle = penColor;

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);

    ctx.stroke();
  }

  function stopDraw() {
    setDrawing(false);
  }

  function startTouch(e) {
    const touch = e.touches[0];

    const canvas = canvasRef.current;

    const rect = canvas.getBoundingClientRect();

    const ctx = canvas.getContext("2d");

    ctx.beginPath();

    ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);

    setDrawing(true);
  }

  function drawTouch(e) {
    if (!drawing) return;

    const touch = e.touches[0];

    const canvas = canvasRef.current;

    const rect = canvas.getBoundingClientRect();

    const ctx = canvas.getContext("2d");

    ctx.lineWidth = 3;

    ctx.lineCap = "round";

    ctx.strokeStyle = penColor;

    ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);

    ctx.stroke();
  }

  function stopTouch() {
    setDrawing(false);
  }

  function clearCanvas() {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function saveDoodle() {
    const canvas = canvasRef.current;

    const tempCanvas = document.createElement("canvas");

    tempCanvas.width = canvas.width;

    tempCanvas.height = canvas.height;

    const tempCtx = tempCanvas.getContext("2d");

    tempCtx.fillStyle = canvasColor;

    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    tempCtx.drawImage(canvas, 0, 0);

    const image = tempCanvas.toDataURL("image/png");

    onSave(image);

    onClose();
  }

  return (
    <div className="p-2 sm:p-4">
      <div
        className="
flex
flex-col
sm:flex-row
justify-between
gap-4
mb-4
"
      >
        <div>
          <p
            className={`
text-sm
font-medium
mb-2
${darkMode ? "text-white" : "text-black"}
`}
          >
            Pen Color
          </p>

          <div className="flex gap-2">
            {["#000000", "#ef4444", "#3b82f6", "#22c55e", "#a855f7"].map(
              (color) => (
                <button
                  key={color}
                  onClick={() => setPenColor(color)}
                  style={{
                    backgroundColor: color,
                  }}
                  className={`
w-5
h-5
rounded-full
transition
hover:scale-110
${penColor === color ? "ring-2 ring-gray-500" : ""}
`}
                />
              ),
            )}
          </div>
        </div>

        <div>
          <p
            className={`
text-sm
font-medium
mb-2
${darkMode ? "text-white" : "text-black"}
`}
          >
            Canvas Color
          </p>

          <div className="flex gap-2">
            {["#ffffff", "#fef3c7", "#dbeafe", "#dcfce7", "#000000"].map(
              (color) => (
                <button
                  key={color}
                  onClick={() => setCanvasColor(color)}
                  style={{
                    backgroundColor: color,
                  }}
                  className={`
w-5
h-5
rounded-full
transition
hover:scale-110
${canvasColor === color ? "ring-2 ring-gray-500" : ""}
`}
                />
              ),
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <canvas
          ref={canvasRef}
          width={isMobile ? 320 : 500}
          height={isMobile ? 220 : 300}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startTouch}
          onTouchMove={drawTouch}
          onTouchEnd={stopTouch}
          style={{
            backgroundColor: canvasColor,
            touchAction: "none",
          }}
          className={`
rounded-xl
border
mx-auto
${darkMode ? "border-gray-600" : "border-gray-300"}
`}
        />
      </div>

      <div
        className="
flex
justify-end
gap-3
mt-4
flex-wrap
"
      >
        <button
          onClick={clearCanvas}
          className="
bg-red-500
hover:bg-red-600
text-white
px-4
py-2
rounded-lg
transition
"
        >
          Clear
        </button>

        <button
          onClick={onClose}
          className={`
px-4
py-2
rounded-lg
transition
${
  darkMode
    ? "bg-gray-700 hover:bg-gray-600 text-white"
    : "bg-gray-300 hover:bg-gray-400 text-black"
}
`}
        >
          Cancel
        </button>

        <button
          onClick={saveDoodle}
          className="
bg-green-500
hover:bg-green-600
text-white
px-4
py-2
rounded-lg
transition
"
        >
          Save Sketch
        </button>
      </div>
    </div>
  );
}

export default DoodleModal;
