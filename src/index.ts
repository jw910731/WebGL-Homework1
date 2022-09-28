import { compileShader } from './compile-shader';
import { VSHADER_SOURCE, FSHADER_SOURCE } from './shaders';

function main() {
    //////Get the canvas context
    const canvas: HTMLCanvasElement = document.getElementById('webgl') as HTMLCanvasElement;
    const gl = canvas.getContext('webgl2');
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // compile shader and use program
    const program = compileShader(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    gl.useProgram(program);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}