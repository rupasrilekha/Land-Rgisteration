import { React, useState, useEffect } from "react";
import { Checkbox } from 'antd';
import {
  Card,
  Col,
  Row,
  Button,
  Modal,
  Form,
  Input,
  Space,
} from "antd";
import Navbar from "../components/navbar/Navbar";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Metamask from "../components/metamask";
import Web3 from 'web3';
import { Footer } from "../components/Footer";

const dashboard = () => {
  const [modalseller, setModalSeller] = useState(false);
  const [modalbuyer, setModalBuyer] = useState(false);
  const [modalinstpector, setModalInspector] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      const _web3 = new Web3(window.ethereum);
    } else {
      alert('Please install MetaMask!');
    }
  }, []);

  const onFinishseller = (values) => {
    window.location = "/form";
  };

  const onFinishbuyer = (values) => {
    window.location = "/lands";
  };

  const onFinishinspector = (values) => {
    if (values.username === 'admin' && values.password === 'admin') {
      window.location = "/inspectordashboard";
    } else {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="bg-gray-200 max-h-screen overflow-y-auto overflow-x-hidden">
      <Navbar />
      <Row gutter={16} className="justify-center py-64">
        <Col
          span={6}
          onClick={() => setModalSeller(true)}
          className="m-8 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
        >
          <Card title="SELLER LOGIN" bordered={false}>
            <ul className="font-bold text-lg mb-2 text-center">FUNCTIONS OF SELLER</ul>
            <ul>
              <li className="text-center">CONNECT TO METAMASK</li>
              <li className="text-center">ADD LAND DETAILS</li>
              <li className="text-center">UPDATE LAND DETAILS</li>
            </ul>
          </Card>
        </Col>
        <Col
          span={6}
          onClick={() => setModalBuyer(true)}
          className="m-8 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
        >
          <Card title="Buyer Login" bordered={false}>
            <ul className="font-bold text-lg mb-2 text-center">FUNCTIONS OF BUYER</ul>
            <ul>
              <li className="text-center">CONNECT TO METAMASK</li>
              <li className="text-center">BUY LAND</li>
              <li className="text-center">REQUEST FOR DOCUMENTS</li>
            </ul>
          </Card>
        </Col>
        <Col
          span={6}
          onClick={() => setModalInspector(true)}
          className="m-8 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
        >
          <Card title="Land Inspector" bordered={false}>
            <ul className="font-bold text-lg mb-2 text-center">FUNCTIONS OF LAND INSPECTOR</ul>
            <ul>
              <li className="text-center">LOGIN USING UNIQUE ID</li>
              <li className="text-center">VERIFY LAND DETAILS</li>
              <li className="text-center">TRANSFER OWNERSHIP</li>
              <li className="text-center">UPDATE LAND DETAILS</li>
            </ul>
          </Card>
        </Col>
      </Row>

      <Modal
        title="Seller Login"
        centered
        footer={null}
        open={modalseller}
        onOk={() => setModalSeller(false)}
        onCancel={() => setModalSeller(false)}
      >
        {(<Metamask /> === '') ? (
          <>
            <p>Connect Wallet</p>
            <br />
            <button className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Wallet Connect
            </button>
          </>
        ) : (
          <>
            <p>Wallet Connected</p>
            <button className="mb-4 bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
              {<Metamask />}
            </button>
          </>
        )}

        <Form
          layout="vertical"
          name="basic"
          onFinish={onFinishseller}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="User ID"
            name="Adhar Number"
            rules={[
              {
                required: true,
                message: "Please input your User ID!",
              },
            ]}
          >
            <Input placeholder="xxxx xxxx xxxx xxxx" />
          </Form.Item>

          <Form.Item wrapperCol={{}}>
            <Space
              direction="vertical"
              style={{
                width: "100%",
              }}
            >
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 rounded"
              >
                Login
              </button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Buyer Login"
        centered
        footer={null}
        open={modalbuyer}
        onOk={() => setModalBuyer(false)}
        onCancel={() => setModalBuyer(false)}
      >
        {(<Metamask /> === '') ? (
          <>
            <p>Connect Wallet</p>
            <br />
            <button className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Wallet Connect
            </button>
          </>
        ) : (
          <>
            <p>Wallet Connected</p>
            <button className="mb-4 bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
              {<Metamask />}
            </button>
          </>
        )}

        <Form
          layout="vertical"
          name="basic"
          onFinish={onFinishbuyer}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="User ID"
            name="Adhar Number"
            rules={[
              {
                required: true,
                message: "Please input your User ID!",
              },
            ]}
          >
            <Input placeholder="xxxx xxxx xxxx xxxx" />
          </Form.Item>

          <Form.Item wrapperCol={{}}>
            <Space
              direction="vertical"
              style={{
                width: "100%",
              }}
            >
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 rounded"
              >
                Login
              </button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Land Inspector Login"
        centered
        footer={null}
        open={modalinstpector}
        onOk={() => setModalInspector(false)}
        onCancel={() => setModalInspector(false)}
      >
        <Form
          name="normal_login"
          className="login-form"
          onFinish={onFinishinspector}
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item wrapperCol={{}}>
            <Space
              direction="vertical"
              style={{
                width: "100%",
              }}
            >
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 rounded"
              >
                Login
              </button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      
      <Footer />
    </div>
  );
};

export default dashboard;