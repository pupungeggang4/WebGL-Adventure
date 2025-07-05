class SceneGame {
    static loop(game) {
        SceneGame.render(game)
        game.world.camera.move(game)
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
        RenderHUD.fillTextHUD(game.ctx, `POS(${game.world.camera.position.x.toFixed(1)}, ${game.world.camera.position.y.toFixed(1)}, ${game.world.camera.position.z.toFixed(1)})`, UI.hud.textPosition)
        game.ctx.fillStyle = 'white'
        RenderHUD.fillRectHUD(game.ctx, UI.hud.lowerRect)
        game.ctx.fillStyle = 'black'
        RenderHUD.fillTextHUD(game.ctx, `[WASD] Move`, UI.hud.textTutorial1)
        RenderHUD.fillTextHUD(game.ctx, `[Arrow] Camera`, UI.hud.textTutorial2)
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
        let cam = game.world.camera
        gl.uniform3f(glVar.location.uCamPos, cam.position.x, cam.position.y, cam.position.z)
        gl.uniform2f(glVar.location.uCamRot, cam.rotation.x, cam.rotation.y)

        RenderGL.renderCuboid(gl, glVar, game.c1, [0.0, 1.0, 0.0])
        RenderGL.renderCuboid(gl, glVar, game.c2, [0.0, 0.0, 1.0])
        RenderGL.renderCuboid(gl, glVar, game.c3, [1.0, 1.0, 0.0])
        RenderGL.renderCuboid(gl, glVar, game.c4, [1.0, 1.0, 1.0])

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

    static keyUp(game, key) {

    }
}
