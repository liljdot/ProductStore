export const checkNameError = (name: any, errsArr: string[]) => {
    if (!name) {
        errsArr.push("name is not defined")
        return true
    }

    if (typeof name != "string") {
        errsArr.push("name must be a string")
        return true
    }

    if (name.length > 255) {
        errsArr.push("name has too many characters")
        return true
    }
}

export const checkImageError = (image: any, errsArr: string[]) => {
    if (!image) {
        errsArr.push("image is not defined")
        return true
    }

    if (typeof image != "string") {
        errsArr.push("image data must be a string")
        return true
    }

    if (image.length > 255) {
        errsArr.push("image has too many characters")
        return true
    }
}

export const checkPriceError = (price: any, errsArr: string[]) => {
    if (!price) {
        errsArr.push("price has no value")
        return true
    }

    if (typeof price != "number") {
        errsArr.push("price must be a number")
        return true
    }

    if (price > 9999999999) {
        errsArr.push("price value is too large")
        return true
    }
}