import React from "react";
import { Form, Input, Button, Typography, notification } from "antd";
import { useNavigate, Link } from "react-router-dom";
import {
  emailRules,
  passwordRules,
  firstNameRules,
  lastNameRules,
} from "../utils/validationRules";
import UserService from "../services/UserService";
import "../App.css";

const { Text } = Typography;

const SignUp = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await UserService.register(values);
      notification.success({
        message: "Registration Successful",
        description: "You have successfully registered. Kindly please login.",
      });
      navigate("/login");
    } catch (error) {
      notification.error({
        message: "Registration Failed",
        description:
          error.response?.data?.message ||
          "An error occurred during registration.",
      });
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="firstName"
            rules={firstNameRules}
            validateTrigger={["onBlur"]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={lastNameRules}
            validateTrigger={["onBlur"]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
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
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <Text>
            Already have an account? <Link to="/login">Login here</Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
