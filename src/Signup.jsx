import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Alert } from 'antd';
import { signup } from './features/user/userSlice';
import { Navigate } from 'react-router-dom';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToHome: false,
            error: false
        }
    }
    onFinish = (values) => {
        const { username, email, password } = values;
        const val = {
            user: { username, email, password }
        }
        this.props.signup(val)
            .unwrap()
            .then(() => {
                this.setState({ redirectToHome: true });
            })
            .catch((error) => {
                console.log('Signup error:', error);
                this.setState({ error: true });
            });
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        if (this.state.redirectToHome) {
            return <Navigate to='/' />;
        }
        return (<>
            {this.state.error && <Alert type="error" message="Signup error" banner />}
            <div className="signupform">
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
        );
    }
}

const mapDispatchToProps = {
    signup
};

export default connect(null, mapDispatchToProps)(Signup);