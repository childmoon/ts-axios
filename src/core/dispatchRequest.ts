import {AxiosPromise, AxiosRequestConfig, AxiosResponse} from "../types";
import xhr from './xhr'
import {buildURL} from "../helpers/url";
import {flattenHeaders} from "../helpers/headers";
import transform from './transform'

export default function dispatchRequest(config:AxiosRequestConfig) :AxiosPromise{
  processConfig(config)
  return xhr(config).then((res)=>{
    return transformResponseData(res)
  })
}

function processConfig(config:AxiosRequestConfig):void {
  config.url=transformURL(config)
  config.data=transform(config.data,config.headers,config.transformRequest)
  config.headers=flattenHeaders(config.headers,config.method!)
}

// function processConfig(config:AxiosRequestConfig):void {
//   config.url=transformURL(config)
//   config.headers=transformHeaders(config)
//   config.data=transformRequestData(config)
// }

function transformURL(config:AxiosRequestConfig):string {
  const {url,params}=config
  return buildURL(url!,params)
}

// function transformRequestData(config:AxiosRequestConfig):any{
//   return transformRequest(config.data)
// }
//
// function transformHeaders(config:AxiosRequestConfig):any {
//   const{headers={},data}=config
//   return processHeaders(headers,data)
// }

function transformResponseData(res:AxiosResponse) {
  res.data=transform(res.data,res.headers,res.config.transformResponse)
  return res
}


















