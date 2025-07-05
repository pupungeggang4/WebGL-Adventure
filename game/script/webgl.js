const sourceVertexShader = `#version 300 es
    precision highp float;
    uniform int u_mode_v;
    uniform vec3 u_position;
    uniform vec3 u_rotation;
    uniform vec3 u_scale;
    uniform vec3 u_cam_pos;
    uniform vec2 u_cam_rot;
    in vec4 a_position;
    in vec4 a_position_w;
    in vec2 a_texcoord;
    out vec2 p_coord;

    void main() {
        if (u_mode_v == 0) {
            gl_Position = a_position;
        } else {
            vec4 pos = a_position_w;
            mat4 mat_scale = mat4(
                u_scale.x, 0.0, 0.0, 0.0,
                0.0, u_scale.y, 0.0, 0.0,
                0.0, 0.0, u_scale.z, 0.0,
                0.0, 0.0, 0.0, 1.0
            );
            mat4 mat_translate = mat4(
                1.0, 0.0, 0.0, 0.0,
                0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                u_position.x, u_position.y, u_position.z, 1.0
            );
            mat4 mat_cam_translate = mat4(
                1.0, 0.0, 0.0, 0.0,
                0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                -u_cam_pos.x, -u_cam_pos.y, -u_cam_pos.z, 1.0
            );
            mat4 mat_cam_zflip = mat4(
                1.0, 0.0, 0.0, 0.0,
                0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, -1.0, 0.0,
                0.0, 0.0, 0.0, 1.0
            );
            mat4 mat_cam_proj = mat4(
                1.0 / (16.0 / 9.0 * tan(1.1 / 2.0)), 0.0, 0.0, 0.0,
                0.0, 1.0 / tan(1.1 / 2.0), 0.0, 0.0,
                0.0, 0.0, (10.0 + 0.1) / (0.1 - 10.0), -1.0,
                0.0, 0.0, (2.0 * 10.0 * 0.1) / (0.1 - 10.0), 0.0
            );
            mat4 mat_cam_rot_x = mat4(
                1.0, 0.0, 0.0, 0.0,
                0.0, cos(-u_cam_rot.x), sin(-u_cam_rot.x), 0.0,
                0.0, -sin(-u_cam_rot.x), cos(-u_cam_rot.x), 0.0,
                0.0, 0.0, 0.0, 1.0
            );
            mat4 mat_cam_rot_y = mat4(
                cos(-u_cam_rot.y), 0.0, -sin(-u_cam_rot.y), 0.0,
                0.0, 1.0, 0.0, 0.0,
                sin(-u_cam_rot.y), 0.0, cos(-u_cam_rot.y), 0.0,
                0.0, 0.0, 0.0, 1.0
            );

            pos = mat_scale * pos;
            pos = mat_translate * pos;
            pos = mat_cam_translate * pos;
            pos = mat_cam_zflip * pos;
            pos = mat_cam_rot_x * pos;
            pos = mat_cam_rot_y * pos;
            pos = mat_cam_proj * pos;
            gl_Position = pos;
        }
        p_coord = a_texcoord;
    }
`

const sourceFragmentShader = `#version 300 es
    precision highp float;
    uniform sampler2D t_sampler;
    uniform int u_mode_f;
    uniform vec3 u_color;
    in vec2 p_coord;
    out vec4 o_color;

    void main() {
        if (u_mode_f == 0) {
            o_color = texture(t_sampler, p_coord);
        } else {
            o_color = vec4(u_color, 1.0);
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
        glVar.location.uPosition = gl.getUniformLocation(glVar.shader.program, 'u_position')
        glVar.location.uScale = gl.getUniformLocation(glVar.shader.program, 'u_scale')
        glVar.location.uColor = gl.getUniformLocation(glVar.shader.program, 'u_color')
        glVar.location.uCamPos = gl.getUniformLocation(glVar.shader.program, 'u_cam_pos')
        glVar.location.uCamRot = gl.getUniformLocation(glVar.shader.program, 'u_cam_rot')
        glVar.location.aPosition = gl.getAttribLocation(glVar.shader.program, 'a_position')
        glVar.location.aPositionW = gl.getAttribLocation(glVar.shader.program, 'a_position_w')
        glVar.location.aTexcoord = gl.getAttribLocation(glVar.shader.program, 'a_texcoord')

        glVar.vao = gl.createVertexArray()
        gl.bindVertexArray(glVar.vao)
        glVar.buffer = {}
        glVar.buffer.hud = gl.createBuffer(gl.ARRAY_BUFFER)
        glVar.buffer.hudIndex = gl.createBuffer(gl.ELEMENT_ARRAY_BUFFER)
        glVar.buffer.cuboid = gl.createBuffer(gl.ARRAY_BUFFER)
        glVar.buffer.cuboidIndex = gl.createBuffer(gl.ELEMENT_ARRAY_BUFFER)
        gl.bindBuffer(gl.ARRAY_BUFFER, glVar.buffer.hud)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1.0, -1.0, 0.0, 1.0,
            1.0, -1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 0.0,
            -1.0, 1.0, 0.0, 0.0
        ]), gl.STATIC_DRAW)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glVar.buffer.hudIndex)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([
            1, 2, 0, 0, 2, 3
        ]), gl.STATIC_DRAW)
        gl.vertexAttribPointer(glVar.location.aPosition, 2, gl.FLOAT, false, 4 * 4, 0)
        gl.enableVertexAttribArray(glVar.location.aPosition)
        gl.vertexAttribPointer(glVar.location.aTexcoord, 2, gl.FLOAT, false, 4 * 4, 2 * 4)
        gl.enableVertexAttribArray(glVar.location.aTexcoord)
        
        gl.bindBuffer(gl.ARRAY_BUFFER, glVar.buffer.cuboid)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,
            0.5, 0.5, -0.5,
            -0.5, 0.5, -0.5,
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, 0.5, 0.5,
            -0.5, 0.5, 0.5
        ]), gl.STATIC_DRAW)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glVar.buffer.cuboidIndex)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([
            0, 1, 4, 4, 1, 5,
            6, 2, 7, 7, 2, 3,
            5, 6, 4, 4, 6, 7,
            3, 2, 0, 0, 2, 1,
            1, 2, 5, 5, 2, 6,
            4, 7, 0, 0, 7, 3
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

    static renderCuboid(gl, glVar, cuboid, color) {
        gl.uniform3f(glVar.location.uColor, color[0], color[1], color[2])
        gl.uniform3f(glVar.location.uPosition, cuboid.position.x, cuboid.position.y, cuboid.position.z)
        gl.uniform3f(glVar.location.uScale, cuboid.size.x, cuboid.size.y, cuboid.size.z)
        gl.bindBuffer(gl.ARRAY_BUFFER, glVar.buffer.cuboid)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glVar.buffer.cuboidIndex)
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0)
    }
}
