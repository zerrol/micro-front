import React, { useEffect, useRef } from 'react'
import { registerMicroApps, start, loadMicroApp } from 'qiankun'

import { Parcel } from 'single-spa'

export default () => {

  const container: React.MutableRefObject<HTMLDivElement | null> = useRef(null)
  const microApp: React.MutableRefObject<Parcel | null> = useRef(null)

  useEffect(() => {
    if(container.current) {
      microApp.current = loadMicroApp(
        { 
          name: 'app', 
          entry: '//localhost:8081',
          container: container.current, 
        }, {
          // TODO: strictStyleIsolation 开启shadow dom的情况下，需要微应用react 16事件会失效，需要另外配置
          // 由于shadow dom 的原因的，一些原生事件也会失效，例如 resize
          // react 17 rc 已支持
          sandbox: {strictStyleIsolation: true}
        }
      ); 
    }

    return () => {
      if(microApp.current) microApp.current?.unmount()
    }
  }, [microApp])

  return (
    <div ref={container}>
      hello react
    </div>
  )
}