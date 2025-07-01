class SceneTitle {
    static loop(game) {
        SceneTitle.renderHUD(game)
        SceneTitle.renderScreen(game)
    }

    static renderHUD(game) {
        RenderHUD.init(game.ctx)
        game.ctx.fillStyle = 'white'
        game.ctx.fillRect(0, 0, 1280, 720)
        game.ctx.fillStyle = 'black'
        RenderHUD.fillTextHUD(game.ctx, '3D Adventure', UI.title.textTitle)
        RenderHUD.strokeRectHUD(game.ctx, UI.title.buttonStart)
        RenderHUD.fillTextHUD(game.ctx, 'Start Game', UI.title.textStart)
    }

    static renderScreen(game) {
        let gl = game.gl
        let glVar = game.glVar
        RenderGL.renderInit(gl, glVar)
        gl.bindVertexArray(glVar.vao)
        gl.uniform1i(glVar.location.uModeV, 0)
        gl.uniform1i(glVar.location.uModeF, 0)
        gl.bindBuffer(gl.ARRAY_BUFFER, glVar.buffer.hud)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, game.canvasHUD)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    static mouseDown(game, pos, button) {

    }

    static mouseUp(game, pos, button) {
        if (button === 0) {
            if (pointInsideRectUI(pos, UI.title.buttonStart)) {
                game.scene = 'game'
                game.state = ''
            }
        }
    }

    static keyDown(game, key) {

    }

    static keyUp(game, key) {

    }
}
