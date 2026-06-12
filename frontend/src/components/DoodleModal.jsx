import { useRef, useState } from "react";

function DoodleModal({ onSave, onClose }) {
  const canvasRef = useRef(null);

  const [drawing, setDrawing] = useState(false);

  const [penColor, setPenColor] = useState("#000000");

  const [canvasColor, setCanvasColor] = useState("#ffffff");

  function startDraw(e) {
    const canvas = canvasRef.current;

    const rect = canvas.getBoundingClientRect();

    const ctx = canvas.getContext("2d");

    ctx.beginPath();

    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);

    setDrawing(true);
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

  function stopDraw() {
    setDrawing(false);
  }

  function clearCanvas() {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function stopTouch() {
    setDrawing(false);
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
    <div className="p-4">
      <div
        className="
flex
flex-col
sm:flex-row
justify-between
mb-4
gap-4
"
      >
        <div>
          <p
            className="
text-sm
font-medium
mb-2
"
          >
            Pen Color
          </p>

          <div
            className="
flex
gap-2
"
          >
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
border
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
            className="
text-sm
font-medium
mb-2
"
          >
            Canvas Color
          </p>

          <div
            className="
flex
gap-2
"
          >
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
border
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

      <canvas
        ref={canvasRef}
        width={500}
        height={300}
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
        className="
border
rounded-xl
"
      />

      <div
        className="
flex
justify-end
gap-3
mt-4
"
      >
        <button
          onClick={clearCanvas}
          className="
bg-red-500
text-white
px-4
py-2
rounded-lg
"
        >
          Clear
        </button>

        <button
          onClick={onClose}
          className="
bg-gray-300
px-4
py-2
rounded-lg
"
        >
          Cancel
        </button>

        <button
          onClick={saveDoodle}
          className="
bg-green-500
text-white
px-4
py-2
rounded-lg
"
        >
          Save Sketch
        </button>
      </div>
    </div>
  );
}

export default DoodleModal;
