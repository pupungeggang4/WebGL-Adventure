const sourceVertexShader = `#version 300 es
    in vec4 a_position;
    in vec2 a_texcoord;
    out vec2 p_coord;

    void main() {
        gl_Position = a_position;
        p_coord = a_texcoord;
    }
`

const sourceFragmentShader = `version 300 es
    precision highp float;
    uniform sampler2D t_sampler;
    in vec2 p_coord;
    out vec4 o_color;

    void main() {
        o_color = texture(t_sampler, p_texcoord);
    }
`

class RenderGL {
    static glInit(gl, glVar) {
        glVar.shader = {}
        glVar.shader.vShader = gl.createShader(gl.VERTEX_SHADER)
        gl.shaderSource(glVar.shader.vShader, sourceVertexShader)
        gl.compileShader(glVar.shader.vShader)
        glVar.shader.fShader = gl.createShader(gl.FRAGMENT_SHADER)
        gl.shaderSource(glVar.shader.fShader, sourceFragmentShader)
        gl.compileShader(glVar.shader.fShader)
        glVar.shader.program = gl.createProgram()
        gl.attachShader(glVar.shader.program, glVar.shader.vShader)
        gl.attachShader(glVar.shader.program, glVar.shader.fShader)
        gl.linkProgram(glVar.shader.program)

        glVar.location = {}
        glVar.texture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, glVar.texture)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)

        glVar.vao = gl.createVertexArray()
        gl.bindVertexArray(glVar.vao)
    }

    static renderInit(gl) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0)
        gl.enable(gl.BLEND | gl.DEPTH_TEST)
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.lineWidth(2)
    }
}
