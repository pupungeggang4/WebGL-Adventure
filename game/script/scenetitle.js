class SceneTitle {
    static loop(game) {
        SceneTitle.renderHUD(game)
    }

    static renderHUD(game) {
        let gl = game.gl
        RenderGL.renderInit(gl)
        RenderHUD.init(game.ctx)
        game.ctx.fillStyle = 'white'
        game.ctx.fillRect(0, 0, 1280, 720)
        game.ctx.fillStyle = 'black'
        RenderHUD.fillTextHUD(game.ctx, '3D Adventure', UI.title.textTitle)
        RenderHUD.strokeRectHUD(game.ctx, UI.title.buttonStart)
        RenderHUD.fillTextHUD(game.ctx, 'Start Game', UI.title.textStart)
        //gl.bindTexture()
        //gl.texImage2D(gl.TEXTURE)
    }
}
