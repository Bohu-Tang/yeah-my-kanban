import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Nav from "../../common/nav/Nav.jsx";
import router from "../../routes/router.js";
import { Layout } from "antd";
const { Header, Content, Footer } = Layout;

function App() {
    return (



        <Layout>
            <Header theme="light" style={{ display: 'flex', alignItems: 'center' }}>
                <Nav></Nav>
            </Header>
            <Content style={{ padding: '0 48px' }}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        {
                            router.map((item, index) => {
                                return <Route key={index} path={item.path} element={<item.element />}></Route>
                            })
                        }
                    </Routes>
                </Suspense>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                <a href="https://beian.miit.gov.cn/" target="_blank">鲁ICP备19013167号</a>
                
            </Footer>
        </Layout>

    )
}

export default App;