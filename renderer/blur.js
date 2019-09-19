/**
 * Based on StackBlur {@see https://github.com/flozz/StackBlur}
 */

const mulTable = [
    512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512,
    454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512,
    482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456,
    437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512,
    497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328,
    320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456,
    446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335,
    329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512,
    505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405,
    399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328,
    324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271,
    268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456,
    451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388,
    385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335,
    332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292,
    289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259]

const shgTable = [
    9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17,
    17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
    19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
    20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
    21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
    21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22,
    22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
    22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24]

/**
 * Extract ImageData from given canvas.
 * 
 * @param {HTMLCanvasElement} canvas
 * @param {Integer} topX
 * @param {Integer} topY
 * @param {Integer} width
 * @param {Integer} height
 * @throws {Error|TypeError}
 * @returns {ImageData} ImageData from canvas
 */
let getImageDataFromCanvas = (canvas, topX, topY, width, height) => {
    if (!canvas || !('getContext' in canvas))
        throw new TypeError('Expecting canvas with `getContext` method.')
    var ctx = canvas.getContext('2d')
    try {
        return ctx.getImageData(topX, topY, width, height)
    } catch (e) {
        throw new Error('Unable to get image data: ' + e)
    }
}

class Blur {
    constructor() {
        this.r = 0
        this.g = 0
        this.b = 0
        this.a = 0
        this.next = null
    }
}

/**
 * Blur given ImageData.
 * 
 * @param {ImageData} imageData
 * @param {Integer} width
 * @param {Integer} height
 * @param {Float} kernel
 * @returns {ImageData}
 */
function blurImageData(imageData, width, height, kernel) {
    const pixels = imageData.data
    let x, y, i, p, yp, yi, yw, rSum, gSum, bSum,
        rOutSum, gOutSum, bOutSum,
        rInSum, gInSum, bInSum,
        pr, pg, pb, rbs
    const div = 2 * kernel + 1
    const widthMinus1 = width - 1
    const heightMinus1 = height - 1
    const radiusPlus1 = kernel + 1
    const sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2

    const stackStart = new Blur()
    let stack = stackStart
    let stackEnd
    for (i = 1; i < div; i++) {
        stack = stack.next = new Blur();
        if (i === radiusPlus1) {
            stackEnd = stack
        }
    }
    stack.next = stackStart
    let stackIn = null
    let stackOut = null

    yw = yi = 0

    const mulSum = mulTable[kernel]
    const shgSum = shgTable[kernel]

    for (y = 0; y < height; y++) {
        rInSum = gInSum = bInSum = rSum = gSum = bSum = 0

        rOutSum = radiusPlus1 * (pr = pixels[yi])
        gOutSum = radiusPlus1 * (pg = pixels[yi + 1])
        bOutSum = radiusPlus1 * (pb = pixels[yi + 2])

        rSum += sumFactor * pr
        gSum += sumFactor * pg
        bSum += sumFactor * pb

        stack = stackStart

        for (i = 0; i < radiusPlus1; i++) {
            stack.r = pr
            stack.g = pg
            stack.b = pb
            stack = stack.next
        }

        for (i = 1; i < radiusPlus1; i++) {
            p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2)
            rSum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i)
            gSum += (stack.g = (pg = pixels[p + 1])) * rbs
            bSum += (stack.b = (pb = pixels[p + 2])) * rbs

            rInSum += pr
            gInSum += pg
            bInSum += pb

            stack = stack.next
        }

        stackIn = stackStart
        stackOut = stackEnd
        for (x = 0; x < width; x++) {
            pixels[yi] = (rSum * mulSum) >> shgSum
            pixels[yi + 1] = (gSum * mulSum) >> shgSum
            pixels[yi + 2] = (bSum * mulSum) >> shgSum

            rSum -= rOutSum
            gSum -= gOutSum
            bSum -= bOutSum

            rOutSum -= stackIn.r
            gOutSum -= stackIn.g
            bOutSum -= stackIn.b

            p = (yw + ((p = x + kernel + 1) < widthMinus1 ? p : widthMinus1)) << 2

            rInSum += (stackIn.r = pixels[p])
            gInSum += (stackIn.g = pixels[p + 1])
            bInSum += (stackIn.b = pixels[p + 2])

            rSum += rInSum
            gSum += gInSum
            bSum += bInSum

            stackIn = stackIn.next

            rOutSum += (pr = stackOut.r)
            gOutSum += (pg = stackOut.g)
            bOutSum += (pb = stackOut.b)

            rInSum -= pr
            gInSum -= pg
            bInSum -= pb

            stackOut = stackOut.next

            yi += 4
        }
        yw += width
    }

    for (x = 0; x < width; x++) {
        gInSum = bInSum = rInSum = gSum = bSum = rSum = 0

        yi = x << 2
        rOutSum = radiusPlus1 * (pr = pixels[yi])
        gOutSum = radiusPlus1 * (pg = pixels[yi + 1])
        bOutSum = radiusPlus1 * (pb = pixels[yi + 2])

        rSum += sumFactor * pr
        gSum += sumFactor * pg
        bSum += sumFactor * pb

        stack = stackStart

        for (i = 0; i < radiusPlus1; i++) {
            stack.r = pr
            stack.g = pg
            stack.b = pb
            stack = stack.next
        }

        yp = width

        for (i = 1; i <= kernel; i++) {
            yi = (yp + x) << 2

            rSum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i)
            gSum += (stack.g = (pg = pixels[yi + 1])) * rbs
            bSum += (stack.b = (pb = pixels[yi + 2])) * rbs

            rInSum += pr
            gInSum += pg
            bInSum += pb

            stack = stack.next

            if (i < heightMinus1) {
                yp += width;
            }
        }

        yi = x
        stackIn = stackStart
        stackOut = stackEnd
        for (y = 0; y < height; y++) {
            p = yi << 2
            pixels[p] = (rSum * mulSum) >> shgSum
            pixels[p + 1] = (gSum * mulSum) >> shgSum
            pixels[p + 2] = (bSum * mulSum) >> shgSum

            rSum -= rOutSum
            gSum -= gOutSum
            bSum -= bOutSum

            rOutSum -= stackIn.r
            gOutSum -= stackIn.g
            bOutSum -= stackIn.b

            p = (x + (((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width)) << 2

            rSum += (rInSum += (stackIn.r = pixels[p]))
            gSum += (gInSum += (stackIn.g = pixels[p + 1]))
            bSum += (bInSum += (stackIn.b = pixels[p + 2]))

            stackIn = stackIn.next

            rOutSum += (pr = stackOut.r)
            gOutSum += (pg = stackOut.g)
            bOutSum += (pb = stackOut.b)

            rInSum -= pr
            gInSum -= pg
            bInSum -= pb

            stackOut = stackOut.next

            yi += width
        }
    }
    return imageData
}

/**
 * Blur all given canvas using specified radius.
 * 
 * @param {HTMLCanvasElement} canvas 
 * @param {Integer} kernel 
 */
let blurCanvas = (canvas, kernel) => {
    if (isNaN(kernel) || kernel < 1) { return }
    kernel |= 0
    var ctx = canvas.getContext('2d')
    var width = ctx.canvas.width
    var height = ctx.canvas.height
    let imageData = getImageDataFromCanvas(canvas, 0, 0, width, height)
    imageData = blurImageData(imageData, width, height, kernel)
    ctx.putImageData(imageData, 0, 0)
}

module.exports = {

    /**
    * @function module:StackBlur.blur
    * @see module:StackBlur~blurCanvas
    */
    blur: blurCanvas

}