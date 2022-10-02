import { compileShader } from "./compile-shader";
import { FSHADER_SOURCE, VSHADER_SOURCE } from "./shaders";
import { ShapeContainer } from "./shape-container";

export class Render {
    canvas: HTMLCanvasElement;
    ctx: WebGLRenderingContext;
    compiledProgram: WebGLProgram;

    pointContainer: ShapeContainer;
    squareContainer: ShapeContainer;
    triangleContainer: ShapeContainer;
    verticalLineContainer: ShapeContainer;
    horizontalLineContainer: ShapeContainer;

    constructor(canvas: HTMLCanvasElement) {
        const gl = canvas.getContext('webgl2') as WebGLRenderingContext | null;
        if (!gl) {
            throw new Error('Failed to get the rendering context for WebGL');
        }

        // compile shader and use program
        this.compiledProgram = compileShader(gl, VSHADER_SOURCE, FSHADER_SOURCE);
        this.ctx = gl;

        this.ctx.useProgram(this.compiledProgram);


        this.pointContainer = new ShapeContainer({ // Points
            context: this.ctx,
            renderType: this.ctx.POINTS
        });
        this.squareContainer = new ShapeContainer({ // Square
            context: this.ctx,
            renderType: this.ctx.POINTS
        });
        this.triangleContainer = new ShapeContainer({ // Triangle
            context: this.ctx,
            renderType: this.ctx.TRIANGLES
        });
        this.verticalLineContainer = new ShapeContainer({ // Vertical Line
            context: this.ctx,
            renderType: this.ctx.LINES
        });
        this.horizontalLineContainer = new ShapeContainer({ // Horizontal Line
            context: this.ctx,
            renderType: this.ctx.LINES
        });
    }

    render() {
        this.ctx.clearColor(1.0, 1.0, 1.0, 1.0);
        this.ctx.clear(this.ctx.COLOR_BUFFER_BIT);

        this.pointContainer.render();
        this.squareContainer.render();
        this.triangleContainer.render();
        this.verticalLineContainer.render();
        this.horizontalLineContainer.render();
    }
}