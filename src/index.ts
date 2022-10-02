import { Render } from "./render";

// Get the canvas context
const canvas = document.getElementById('webgl') as HTMLCanvasElement | null;
if (!canvas) {
    throw new Error('Failed to get canvas of WebGL');
}

const render = new Render(canvas);

canvas.onmousedown = render.mouseEventListener.bind(render);
document.onkeydown = render.keyEventListener.bind(render);
window.addEventListener('resize', render.render.bind(render));