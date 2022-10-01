import { compileShader } from "./compile-shader";
import { FSHADER_SOURCE, VSHADER_SOURCE } from "./shaders";

export class Render {
    canvas: HTMLCanvasElement;
    ctx: WebGL2RenderingContext;
    compiledProgram: WebGLProgram;

    constructor(canvas: HTMLCanvasElement) {
        const gl = canvas.getContext('webgl2') as WebGL2RenderingContext | null;
        if (!gl) {
            throw new Error('Failed to get the rendering context for WebGL');
        }

        // compile shader and use program
        this.compiledProgram = compileShader(gl, VSHADER_SOURCE, FSHADER_SOURCE);
        this.ctx = gl;

        this.ctx.useProgram(this.compiledProgram);
    }

    render() {
        this.ctx.clearColor(1.0, 1.0, 1.0, 1.0);
        this.ctx.clear(this.ctx.COLOR_BUFFER_BIT);
    }
}