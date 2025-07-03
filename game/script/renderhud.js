class RenderHUD {
    static init(ctx) {
        ctx.font = '32px neodgm'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'top'
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 2
        ctx.fillStyle = 'black'
        ctx.clearRect(0, 0, 1280, 720)
    }

    static strokeRectHUD(ctx, rect) {
        ctx.strokeRect(rect[0], rect[1], rect[2], rect[3])
    }

    static fillRectHUD(ctx, rect) {
        ctx.fillRect(rect[0], rect[1], rect[2], rect[3])
    }

    static fillTextHUD(ctx, text, pos) {
        ctx.fillText(text, pos[0], pos[1])
    }

    static drawImageHUD(ctx, image, pos) {
        ctx.drawImage(image, pos[0], pos[1])
    }
}
