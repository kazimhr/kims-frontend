import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import userService from '../../services/UserServices';
import { toast } from 'react-toastify';

const LoginModal = (props) => {
	const [ email, setEmail ] = React.useState('kazimhr@hotmail.com');
	const [ password, setPassword ] = React.useState('test');

	function timeout(delay) {
		return new Promise((res) => setTimeout(res, delay));
	}

	const onClose = () => {
		props.onHide();
		setEmail('kazimhr@hotmail.com');
		setPassword('test');
	};

	return (
		<div className="content-div-s">
			<Modal {...props} backdrop="static" keyboard={false}>
				<Modal.Header>
					<Modal.Title>Login</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Form.Group>
						<Modal.Footer>
							<Button
								variant="primary"
								onClick={(e) =>
									userService
										.login(email, password)
										.then(async (data) => {
											console.log(data);
											toast.success('Login Successful', {
												position: toast.POSITION.TOP_CENTER
											});
											props.onHide();
											await timeout(1500);
											window.location.href = '/';
										})
										.catch((err) => {
											console.log(err);
											toast.error('Invalid email or password!', {
												position: toast.POSITION.TOP_LEFT
											});
										})}
							>
								Submit
							</Button>
							<Button variant="secondary" onClick={onClose}>
								Close
							</Button>
						</Modal.Footer>
					</Form>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default LoginModal;
