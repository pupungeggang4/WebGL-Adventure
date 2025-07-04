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
        RenderHUD.fillRectHUD(game.ctx, UI.hud.upperRect)
        game.ctx.fillStyle = 'black'
        RenderHUD.drawImageHUD(game.ctx, img.icon.life, UI.hud.iconLife)
        RenderHUD.fillTextHUD(game.ctx, `60/60`, UI.hud.textLife)
        RenderHUD.fillTextHUD(game.ctx, `0, 0, 0`, UI.hud.textPosition)
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

        gl.bindBuffer(gl.ARRAY_BUFFER, glVar.buffer.cuboid)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glVar.buffer.cuboidIndex)
        gl.uniform3f(glVar.location.uPosition, 0.1, 0.1, 0.1)
        gl.uniform3f(glVar.location.uScale, 0.1, 0.1, 0.1)
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0)
        gl.uniform3f(glVar.location.uPosition, -0.3, -0.1, 0.1)
        gl.uniform3f(glVar.location.uScale, 0.1, 0.1, 0.1)
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0)

        gl.disable(gl.DEPTH_TEST)
        gl.uniform1i(glVar.location.uModeV, 0)
        gl.uniform1i(glVar.location.uModeF, 0)
        gl.bindBuffer(gl.ARRAY_BUFFER, glVar.buffer.hud)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, glVar.buffer.hudIndex)
        gl.disableVertexAttribArray(glVar.location.aPositionW)
        gl.enableVertexAttribArray(glVar.location.aPosition)
        gl.enableVertexAttribArray(glVar.location.aTexcoord)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, game.canvasHUD)
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)
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
