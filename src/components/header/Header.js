import React, { useState, useEffect } from 'react';
import { auth, fireStore } from '../../firebase'
import { Layout, Icon, Drawer } from 'antd'

function Header(props) {

    const [visible, setVisible] = useState(false)

    const openMenu = () => {
        console.log('menu opened')
        setVisible(true)
      }
    
      const onClose = () => {
        setVisible(false)
      }

      const logout = () => {
        console.log('logged out...')
        auth.signOut();
        setVisible(false)
      }

      const { Header } = Layout;

    return (
        <div className="header">
            <Layout>
                <Header style={{ backgroundColor: '#4c1965ff', textAlign: 'center', color: '#f5f5f5fe' }} className="header">
                    <span style={{float: 'left', fontSize: '2em', color: '#f5f5f5fe'}} onClick={openMenu}><Icon type="menu-unfold"/></span>
                    <span style={{ fontSize: '2.4em' }}><b>Two D Stats</b></span>
                </Header>

                <Drawer
                    title='Menu'
                    placement='left'
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                >
                    <p onClick={logout}>Log Out</p>
                    <hr />
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>

            </Layout>

        </div>
    );
}

export default Header; 
 