export const validUrlConvert = (data)=>{
    const convertedData = `${data?.replaceAll(" ", "").replaceAll(",", "").replaceAll("&", "")}`
    return convertedData
}