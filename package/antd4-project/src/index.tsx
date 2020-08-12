import React from 'react'
import App from './routes'
import ReactDOM, {render} from 'react-dom'
import 'mobx-react/batchingForReactDom'

import zhCN from 'antd/lib/locale-provider/zh_CN'
import { ConfigProvider  } from 'antd'
import { Home } from './pages'
import '@assets/css/index.global'

const DOM_ROOT = 'reactAntd4Root'

function renderApp(props?: any) {
  render(
    <ConfigProvider 
      locale={zhCN} 
      autoInsertSpaceInButton={false} 
      getPopupContainer={() => document.getElementById(DOM_ROOT)!} >
      <App/>
    </ConfigProvider>,
    document.querySelector(`#${DOM_ROOT}`)
  )
}


if (!window.__POWERED_BY_QIANKUN__) {
  renderApp();
}


/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('react app bootstraped');
}
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props: any) {
  console.log(props);
  console.log('mount query selector', props.container.querySelector(`#${DOM_ROOT}`), document.getElementById(DOM_ROOT))
  const domRoot = props.container.querySelector(`#${DOM_ROOT}`)
  render(
    <ConfigProvider locale={zhCN} autoInsertSpaceInButton={false} getPopupContainer={() => domRoot}>
      <Home />
    </ConfigProvider>, 
    domRoot
  )
}
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  const dom = document.getElementById(DOM_ROOT)
  if(!dom) return

  ReactDOM.unmountComponentAtNode(dom);
}
/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props: any) {
  console.log('update props', props);
}