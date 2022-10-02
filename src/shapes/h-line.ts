import { Shape, ShapeOptions } from "./shape";
import { Vertex } from "./vertex";

export interface HorizontalLineOptions extends ShapeOptions {
    y: number;
}

export class HorizontalLine extends Shape {
    y: number;

    constructor(option: HorizontalLineOptions) {
        super(option);
        this.y = option.y;

        this.vertice.push(
            new Vertex({
                x: 0,
                y: this.y,
                color: option.color,
            }),
            new Vertex({
                x: Infinity,
                y: this.y,
                color: option.color,
            })
        )
    }
}