export const VSHADER_SOURCE = `
    uniform vec2 resolution;
    attribute vec2 position;   
    attribute float size;
    attribute vec4 color; 

    varying vec4 frag_color;
    void main(){
        // https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html

        // convert the position from pixels to 0.0 to 1.0
        vec2 zeroToOne = position / resolution;

        // convert from 0->1 to 0->2
        vec2 zeroToTwo = zeroToOne * 2.0;

        // convert from 0->2 to -1->+1 (clip space)
        vec2 clipSpace = zeroToTwo - 1.0;

        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
        frag_color = color;
        gl_PointSize = size;
    }
`;
export const FSHADER_SOURCE = `
    precision mediump float;
    varying vec4 frag_color;
    void main(){
        gl_FragColor = frag_color;
    }
`;