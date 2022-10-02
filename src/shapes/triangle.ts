import { Shape, ShapeOptions } from "./shape";
import { Vertex } from "./vertex";

export interface TriangleOptions extends ShapeOptions {
    center: {
        x: number;
        y: number
    };
    size?: number;
}

export class Triangle extends Shape {
    center: {
        x: number;
        y: number;
    };
    size: number;

    constructor(option: TriangleOptions) {
        super(option);
        this.center = structuredClone(option.center);
        this.size = option.size || 10;

        this.vertice.push(
            new Vertex({
                x: this.center.x,
                y: this.center.y - this.size,
                color: this.color,
            }),
            new Vertex({
                x: this.center.x - (this.size * Math.sin(Math.PI / 6)),
                y: this.center.y - (this.size * Math.cos(Math.PI / 6)),
                color: this.color,
            }),
            new Vertex({
                x: this.center.x + (this.size * Math.sin(Math.PI / 6)),
                y: this.center.y - (this.size * Math.cos(Math.PI / 6)),
                color: this.color,
            })
        )
    }

}