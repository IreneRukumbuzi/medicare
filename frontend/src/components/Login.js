import React from "react";
import { Form, Input, Button, Typography, notification } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { emailRules, passwordRules } from "../utils/validationRules";
import UserService from "../services/UserService";
import "../App.css";

const { Text } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const data = await UserService.login(values);
      notification.success({
        message: "Login Successful",
        description: "Welcome back!",
      });
      localStorage.setItem("token", data.token);
      navigate(`/profile`);
    } catch (error) {
      notification.error({
        message: "Login Failed",
        description: error.response?.data?.message || "Invalid credentials",
      });
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={emailRules}
            validateTrigger={["onBlur"]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={passwordRules}
            validateTrigger={["onBlur"]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <Text>Don't have an account? <Link to="/signup">Sign up here</Link></Text>
        </div>
      </div>
    </div>
  );
};

export default Login;
