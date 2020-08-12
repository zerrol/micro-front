import React from "react"
import { Layout, Menu, Icon } from "antd"
import { HashRouter, Redirect, Route, Switch, Link } from "react-router-dom"

import routes from "../routes/routes"
import asyncRoutes from "../routes/asyncRoutes"
import { useLocalStore, useObserver } from "mobx-react"

import styles from "./styles.less"

const { Header, Sider } = Layout

export default () => {
  const store = useLocalStore(() => ({
    collapsed: false,
    toggle() {
      store.collapsed = !store.collapsed
    },
  }))

  return useObserver(() => (
    <Layout className={styles.container}>
      <Sider trigger={null} collapsible collapsed={store.collapsed}>
        <div className={styles.logo} > demo </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span>home</span>
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span>async fly</span>
            <Link to="/fly">async fly</Link>
          </Menu.Item>
          <Menu.Item key="3" >
            <Icon type="search" />
            <span>micro app</span>
            <Link to="/microAntd4">micro</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className={styles.site}>
        <Header className={styles.background} style={{ padding: 0 }}>
          <Icon className={styles.trigger} type={store.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={store.toggle}/>
        </Header>
        <HashRouter>
          <Switch>
            <Redirect exact from="/" to="/home" />

            {routes.map((route, index) => (
              <Route key={index} {...route} />
            ))}

            {asyncRoutes.map((route, index) => (
              <Route key={index} {...route} />
            ))}

          </Switch>
        </HashRouter>
      </Layout>
    </Layout>
  ))
}
