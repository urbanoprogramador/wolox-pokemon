export const  clearHtml=(texto:string) =>{

        let strHtmlCode = texto.replace(/&(lt|gt);/g,
         (p:string) => {
            return (p[1] === "lt") ? "<" : ">";
        });
        return  strHtmlCode.replace(/<\/?[^>]+(>|$)/g, "");
}

