import { Shape } from './shape';

export interface VertexOptions {
    x: number;
    y: number;
    size?: number;
    color?: Array<number>;
}

export class Vertex {
    x: number;
    y: number;
    size: number;
    color: Array<number>;

    constructor(option: VertexOptions) {
        this.x = option.x;
        this.y = option.y;
        this.size = option.size || 1;
        this.color = option.color || [0.0, 0.0, 0.0];
    }

    get binaryData() {
        return new Float32Array([this.x, this.y, this.size, ...this.color]);
    }
}