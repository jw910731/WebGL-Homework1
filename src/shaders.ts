export const VSHADER_SOURCE = `
    uniform float size;
    uniform vec4 position;
    uniform vec4 color; 

    varying vec4 frag_color;
    void main(){
        gl_Position = position;
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