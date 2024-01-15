export const delayReturn = async (time = 2000) => {
    const p = new Promise(res => {

        setTimeout(() => {
            res(1);
        }, time);
    });
    return await p;
};
