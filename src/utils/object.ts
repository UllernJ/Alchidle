/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
export const deeepClone = (obj: any): any => {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }
    const clone: any = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
        clone[key] = deeepClone(obj[key]);
        }
    }
    return clone;
    }