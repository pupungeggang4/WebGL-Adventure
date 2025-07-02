class SceneGame {
    static loop(game) {
        SceneGame.render(game)
    }

    static render(game) {
        SceneGame.renderHUD(game)
        SceneGame.renderScreen(game)
    }

    static renderHUD(game) {
        RenderHUD.init(game.ctx)
        game.ctx.fillStyle = 'white'
        game.ctx.fillRect(640, 280, 80, 80)
        game.ctx.fillStyle = 'black'
    }
    
    static renderScreen(game) {
        let gl = game.gl
        let glVar = game.glVar
        RenderGL.renderInit(gl, glVar)
        gl.bindVertexArray(glVar.vao)

        gl.enable(gl.DEPTH_TEST)
        gl.uniform1i(glVar.location.uModeV, 1)
        gl.uniform1i(glVar.location.uModeF, 1)
        gl.enableVertexAttribArray(glVar.location.aPositionW)
        gl.disableVertexAttribArray(glVar.location.aPosition)
        gl.disableVertexAttribArray(glVar.location.aTexcoord)
        gl.bindBuffer(gl.ARRAY_BUFFER, glVar.buffer.triangle)
        gl.drawArrays(gl.TRIANGLES, 0, 3)

        gl.disable(gl.DEPTH_TEST)
        gl.uniform1i(glVar.location.uModeV, 0)
        gl.uniform1i(glVar.location.uModeF, 0)
        gl.bindBuffer(gl.ARRAY_BUFFER, glVar.buffer.hud)
        gl.disableVertexAttribArray(glVar.location.aPositionW)
        gl.enableVertexAttribArray(glVar.location.aPosition)
        gl.enableVertexAttribArray(glVar.location.aTexcoord)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, game.canvasHUD)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    static mouseDown(game, pos, button) {

    }

    static mouseUp(game, pos, button) {

    }

    static keyDown(game, key) {

    }

    static keyDown(game, key) {

    }
}
