import { Shape, ShapeOptions } from "./shape";
import { Vertex } from "./vertex";

export interface VerticalLineOptions extends ShapeOptions {
    x: number;
}

export class VerticalLine extends Shape {
    x: number;

    constructor(option: VerticalLineOptions) {
        super(option);
        this.x = option.x;

        this.vertice.push(
            new Vertex({
                x: this.x,
                y: 0,
                color: option.color,
            }),
            new Vertex({
                x: this.x,
                y: Infinity,
                color: option.color,
            })
        )
    }
}