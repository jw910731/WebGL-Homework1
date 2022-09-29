import { compileShader } from './compile-shader';
import { VSHADER_SOURCE, FSHADER_SOURCE } from './shaders';

// Get the canvas context
const canvas = document.getElementById('webgl') as HTMLCanvasElement | null;
if (!canvas) {
    throw new Error('Failed to get canvas of WebGL');
}
const gl = canvas.getContext('webgl2') as WebGL2RenderingContext | null;
if (!gl) {
    throw new Error('Failed to get the rendering context for WebGL');
}

// compile shader and use program
const program = compileShader(gl, VSHADER_SOURCE, FSHADER_SOURCE);
gl.useProgram(program);

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);