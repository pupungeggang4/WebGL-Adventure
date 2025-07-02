const sourceVertexShader = `#version 300 es
    uniform int u_mode_v;
    in vec4 a_position;
    in vec4 a_position_w;
    in vec2 a_texcoord;
    out vec2 p_coord;

    void main() {
        if (u_mode_v == 0) {
            gl_Position = a_position;
        } else {
            gl_Position = a_position_w;
        }
        p_coord = a_texcoord;
    }
`

const sourceFragmentShader = `#version 300 es
    precision highp float;
    uniform sampler2D t_sampler;
    uniform int u_mode_f;
    in vec2 p_coord;
    out vec4 o_color;

    void main() {
        if (u_mode_f == 0) {
            o_color = texture(t_sampler, p_coord);
        } else {
            o_color = vec4(0.0, 1.0, 0.0, 1.0);
        }
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
        glVar.location.uModeV = gl.getUniformLocation(glVar.shader.program, 'u_mode_v')
        glVar.location.uModeF = gl.getUniformLocation(glVar.shader.program, 'u_mode_f')
        glVar.location.aPosition = gl.getAttribLocation(glVar.shader.program, 'a_position')
        glVar.location.aPositionW = gl.getAttribLocation(glVar.shader.program, 'a_position_w')
        glVar.location.aTexcoord = gl.getAttribLocation(glVar.shader.program, 'a_texcoord')

        glVar.vao = gl.createVertexArray()
        gl.bindVertexArray(glVar.vao)
        glVar.buffer = {}
        glVar.buffer.hud = gl.createBuffer(gl.ARRAY_BUFFER)
        glVar.buffer.triangle = gl.createBuffer(gl.ARRAY_BUFFER)
        gl.bindBuffer(gl.ARRAY_BUFFER, glVar.buffer.hud)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            1.0, -1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 0.0,
            -1.0, -1.0, 0.0, 1.0,
            -1.0, -1.0, 0.0, 1.0,
            1.0, 1.0, 1.0, 0.0,
            -1.0, 1.0, 0.0, 0.0
        ]), gl.STATIC_DRAW)
        gl.vertexAttribPointer(glVar.location.aPosition, 2, gl.FLOAT, false, 4 * 4, 0)
        gl.enableVertexAttribArray(glVar.location.aPosition)
        gl.vertexAttribPointer(glVar.location.aTexcoord, 2, gl.FLOAT, false, 4 * 4, 2 * 4)
        gl.enableVertexAttribArray(glVar.location.aTexcoord)
        
        gl.bindBuffer(gl.ARRAY_BUFFER, glVar.buffer.triangle)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.5, 0.5, 0.0
        ]), gl.STATIC_DRAW)
        gl.vertexAttribPointer(glVar.location.aPositionW, 3, gl.FLOAT, false, 3 * 4, 0)
        gl.enableVertexAttribArray(glVar.location.aPositionW)

        glVar.texture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, glVar.texture)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
    }

    static renderInit(gl, glVar) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0)
        gl.enable(gl.BLEND)
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        gl.lineWidth(2)
        gl.useProgram(glVar.shader.program)
    }
}
