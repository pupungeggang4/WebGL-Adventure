class SceneTitle {
    static loop(game) {
        SceneTitle.renderHUD(game)
    }

    static renderHUD(game) {
        let gl = game.gl
        RenderGL.renderInit(gl)
        RenderHUD.init(game.ctx)
        RenderHUD.fillTextHUD(game.ctx, '3D Adventure', UI.title.Title)
        RenderHUD.strokeRectHUD(game.ctx, UI.title.buttonStart)
        RenderHUD.fillTextHUD(game.ctx, 'Start Game', UI.title.textStart)
        //gl.bindTexture()
        //gl.texImage2D(gl.TEXTURE)
    }
}
