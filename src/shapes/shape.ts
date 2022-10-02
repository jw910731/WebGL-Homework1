import { Vertex } from "./vertex";

export interface ShapeOptions {
    color: Array<number>;
}

export class Shape {
    color: Array<number>;
    vertice: Vertex[];

    constructor(options: ShapeOptions) {
        this.color = options.color;
    }

    get vertexCount() {
        return this.vertice.length;
    }

    get binaryData() {
        return this.vertice.map(e => [...e.binaryData]).flat();
    }
}