import { compileShader } from "./compile-shader";
import { FSHADER_SOURCE, VSHADER_SOURCE } from "./shaders";
import { ShapeContainer } from "./shape-container";
import { Point } from './shapes/point';
import { HorizontalLine } from './shapes/h-line';
import { VerticalLine } from './shapes/v-line';
import { Square } from './shapes/square';
import { Triangle } from './shapes/triangle';

export class Render {
    canvas: HTMLCanvasElement;
    ctx: WebGLRenderingContext;
    compiledProgram: WebGLProgram;

    pointContainer: ShapeContainer;
    squareContainer: ShapeContainer;
    triangleContainer: ShapeContainer;
    verticalLineContainer: ShapeContainer;
    horizontalLineContainer: ShapeContainer;

    currentColor: Array<number>;
    currentShape: 'p' | 'h' | 'v' | 't' | 'q';

    binaryFormat: { attribLocation: number, dataType: number, dataTypeSize: number, count: number }[];


    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        const gl = this.canvas.getContext('webgl2') as WebGLRenderingContext | null;
        if (!gl) {
            throw new Error('Failed to get the rendering context for WebGL');
        }
        this.ctx = gl;

        // compile shader and use program
        this.compiledProgram = compileShader(this.ctx, VSHADER_SOURCE, FSHADER_SOURCE);


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

        this.binaryFormat = [
            {
                attribLocation: this.ctx.getAttribLocation(this.compiledProgram, 'position'),
                dataType: this.ctx.FLOAT,
                dataTypeSize: Float32Array.BYTES_PER_ELEMENT,
                count: 2 // x, y
            },
            {
                attribLocation: this.ctx.getAttribLocation(this.compiledProgram, 'size'),
                dataType: this.ctx.FLOAT,
                dataTypeSize: Float32Array.BYTES_PER_ELEMENT,
                count: 1
            },
            {
                attribLocation: this.ctx.getAttribLocation(this.compiledProgram, 'color'),
                dataType: this.ctx.FLOAT,
                dataTypeSize: Float32Array.BYTES_PER_ELEMENT,
                count: 3 // r, g, b
            },
        ];

        this.currentColor = [1.0, 0.0, 0.0];
        this.currentShape = 'p';

        // init vbo
        this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, this.ctx.createBuffer());
        this.enableAttributes();
        this.render();
    }

    enableAttributes() {
        let offset = 0;
        const stride = this.binaryFormat.reduce((a, cur) => a + cur.count, 0);

        for (const attribute of this.binaryFormat) {
            this.ctx.vertexAttribPointer(attribute.attribLocation, attribute.count, attribute.dataType, false, attribute.dataTypeSize * stride, attribute.dataTypeSize * offset);
            this.ctx.enableVertexAttribArray(attribute.attribLocation);

            offset += attribute.count;
        }
    }

    render() {
        this.resizeCanvasToDisplaySize();
        this.ctx.viewport(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.uniform2f(this.ctx.getUniformLocation(this.compiledProgram, 'resolution'), this.canvas.width, this.canvas.height);
        this.ctx.clearColor(1.0, 1.0, 1.0, 1.0);
        this.ctx.clear(this.ctx.COLOR_BUFFER_BIT);

        this.pointContainer.render();
        this.squareContainer.render();
        this.triangleContainer.render();
        this.verticalLineContainer.render();
        this.horizontalLineContainer.render();
    }

    keyEventListener(event: KeyboardEvent) {
        switch (event.key) {
            case 'p':
            case 'h':
            case 'v':
            case 't':
            case 'q':
                this.currentShape = event.key;
                break;
            case 'r':
                this.currentColor = [1.0, 0.0, 0.0];
                break;
            case 'g':
                this.currentColor = [0.0, 1.0, 0.0];
                break;
            case 'b':
                this.currentColor = [0.0, 0.0, 1.0];
                break;
            default:
                break;
        }
    }

    mouseEventListener(event: MouseEvent) {
        event.preventDefault();

        const { x, y } = event;

        switch (this.currentShape) {
            case 'p':
                this.pointContainer.add(new Point({
                    x: x,
                    y: y,
                    color: [...this.currentColor],
                }));
                break;

            case 'h':
                this.horizontalLineContainer.add(new HorizontalLine({
                    y: y,
                    color: [...this.currentColor],
                }));
                break;

            case 'v':
                this.verticalLineContainer.add(new VerticalLine({
                    x: x,
                    color: [...this.currentColor],
                }));
                break;

            case 't':
                this.triangleContainer.add(new Triangle({
                    x: x,
                    y: y,
                    color: [...this.currentColor],
                }))
                break;

            case 'q':
                this.squareContainer.add(new Square({
                    x: x,
                    y: y,
                    color: [...this.currentColor],
                }))
                break;

            default:
                break;
        }

        this.render();
    }

    // https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
    resizeCanvasToDisplaySize() {
        // Lookup the size the browser is displaying the canvas in CSS pixels.
        const displayWidth = this.canvas.clientWidth;
        const displayHeight = this.canvas.clientHeight;

        // Check if the canvas is not the same size.
        const needResize = this.canvas.width !== displayWidth ||
            this.canvas.height !== displayHeight;

        if (needResize) {
            // Make the canvas the same size
            this.canvas.width = displayWidth;
            this.canvas.height = displayHeight;
        }

        return needResize;
    }
}