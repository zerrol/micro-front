import React, { useEffect } from 'react'
// import {queryTest} from '@api'
import { Button, Modal, Tooltip, message, Popover } from 'antd'
import { useLocalStore, observer } from 'mobx-react'

import styles from './style.less'

export default observer((props: any) =>  {

  const store = useLocalStore(() => ({
    num: 1,
    modalVisible: false,
    init() {
      console.log('init num', this.num)
      this.num = 233
    },
    add() {
      console.log('num add', this.num)
      this.num++
    },
    delete() {
      this.num--
      message.warn('delete success')
    },
    triggerModal() {
      this.modalVisible = !this.modalVisible
    }
  }))

  useEffect(() => {
    store.init()
  }, [store])

  let handleClick = async () => {
    // const {message} = await queryTest()
    // alert(message)
    new Promise((resolve, reject) => {
      console.log(1)
      setTimeout(resolve, 100)
    }).then(() => {
      console.log(2)
      // alert('hello')
    })
    store.triggerModal()
    console.log(3)
    props?.hello?.()
  }

  function deleteNum() {
    Modal.confirm({
      title: 'Are you sure you want to delete',
      onOk: store.delete
    })
  }

  return (
    <>
      <div>btn area {store.num}</div>

      <Tooltip title='hello world'> 
        <Button type="primary" ghost className={styles.btn} onClick={handleClick}>hello</Button>
      </Tooltip>
      {/* <Link to='/fly'> go to fly </Link> */}


      <Popover content={
        <div>content</div>
      } title="Title">
        <Button type="primary" onClick={store.add} className={styles.btn}>add num</Button>
      </Popover>
      <Button type="primary" onClick={deleteNum}>delete num</Button>

      <Modal 
        visible={store.modalVisible} 
        onOk={store.triggerModal} 
        wrapClassName={styles.modal}
        onCancel={store.triggerModal}> 
        <div className={styles.hello}>
          hello modal 
        </div>
      </Modal>
    </>
  )
 
})