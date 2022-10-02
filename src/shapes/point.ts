import { Shape, ShapeOptions } from "./shape";
import { Vertex } from "./vertex";

export interface PointOptions extends ShapeOptions {
    x: number;
    y: number;
}

export class Point extends Shape {
    x: number;
    y: number;
    constructor(options: PointOptions) {
        super(options);
        this.x = options.x;
        this.y = options.y;

        this.vertice.push(
            new Vertex({
                x: this.x,
                y: this.y,
                size: 1,
                color: this.color
            }),
        )
    }
}