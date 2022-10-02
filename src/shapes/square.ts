import { Shape, ShapeOptions } from "./shape";
import { Vertex } from "./vertex";

export interface SquareOptions extends ShapeOptions {
    x: number;
    y: number;
}

export class Square extends Shape {
    x: number;
    y: number;

    constructor(option: SquareOptions) {
        super(option)
        this.x = option.x;
        this.y = option.y;

        this.vertice.push(
            new Vertex({
                x: this.x,
                y: this.y,
                size: 10,
                color: this.color,
            })
        )
    }
}