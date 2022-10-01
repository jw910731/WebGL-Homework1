import { Render } from "./render";

// Get the canvas context
const canvas = document.getElementById('webgl') as HTMLCanvasElement | null;
if (!canvas) {
    throw new Error('Failed to get canvas of WebGL');
}

const render = new Render(canvas);

window.addEventListener('resize', render.render.bind(render));