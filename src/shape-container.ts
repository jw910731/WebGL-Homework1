import { Shape } from "./shapes/shape";

export class ShapeContainerOption{
    renderType: number;
    context: WebGLRenderingContext;
}

export class ShapeContainer {
    elements: Shape[];

    renderType: number;
    ctx: WebGLRenderingContext;

    constructor(options: ShapeContainerOption){
        this.renderType = options.renderType;
        this.ctx = options.context;
    }

    get vertexCount(): number {
        return this.elements.reduce((accu, cur) => accu + cur.vertexCount, 0);
    }

    add(shape: Shape) {
        if (this.elements.length >= 5) {
            this.elements.shift();
        }
        this.elements.push(shape);
    }

    get binaryData(): Float32Array {
        return new Float32Array(this.elements.map(e => [...e.binaryData]).flat());
    }

    render() {
        if (this.elements.length <= 0) {
            return;
        }

        this.ctx.bufferData(this.ctx.ARRAY_BUFFER, this.binaryData, this.ctx.STATIC_DRAW);
        this.ctx.drawArrays(this.renderType, 0, this.vertexCount);

    }
}