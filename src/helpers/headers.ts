import {isPlainObject} from "./util";

function normallizeHeaderName(headers:any,normalizedName:string):void {
   if(!headers){
     return
   }
   Object.keys(headers).forEach((name)=>{
     if(name!==normalizedName&&name.toUpperCase()===
     normalizedName.toUpperCase()){
       headers[normalizedName]=headers[name]
       delete headers[name]
     }
   })
}

export function processHeaders(headers:any,data:any):any {
  normallizeHeaderName(headers,'Content-Type')
  if(isPlainObject(data)){
    if(headers && !headers['Content-Type']){
      headers['Content-Type']='application/json;charset=utf-8'
    }
  }
}
