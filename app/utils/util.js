const delayReturn = async (time = 2000) => {
    const p = new Promise((res, rej) => {

        setTimeout(() => {
            res(1)
        }, time)
    })
    return await p
}

export {
    delayReturn
}