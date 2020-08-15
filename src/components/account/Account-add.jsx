import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import accountService from '../../services/AccountServices';

function MyVerticallyCenteredModalAccount(props) {
	const [ validated, setValidated ] = React.useState(false);
	const [ flow, setFlow ] = React.useState('Inflow');
	const [ amount, setAmount ] = React.useState(0);

	const handleSubmit = async (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			setValidated(true);
			accountService
				.addaccount({
					flow,
					amount
				})
				.then((data) => {
					console.log(data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<ReactBootstrap.Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
			<ReactBootstrap.Modal.Header closeButton>
				<ReactBootstrap.Modal.Title id="contained-modal-title-vcenter">
					Add New Record
				</ReactBootstrap.Modal.Title>
			</ReactBootstrap.Modal.Header>
			<ReactBootstrap.Modal.Body>
				<ReactBootstrap.Form validated={validated} onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
					<ReactBootstrap.Form.Group as={ReactBootstrap.Row}>
						<ReactBootstrap.Form.Label column sm={4}>
							Flow
						</ReactBootstrap.Form.Label>
						<ReactBootstrap.Col sm={8}>
							<ReactBootstrap.Form.Control
								required
								as="select"
								custom
								onChange={(e) => {
									setFlow(e.target.value);
								}}
							>
								<option defaultValue>Inflow</option>
								<option>Outflow</option>
							</ReactBootstrap.Form.Control>
						</ReactBootstrap.Col>
						<ReactBootstrap.Form.Control.Feedback>Looks good!</ReactBootstrap.Form.Control.Feedback>
					</ReactBootstrap.Form.Group>
					<ReactBootstrap.Form.Group as={ReactBootstrap.Row}>
						<ReactBootstrap.Form.Label column sm={4}>
							Amount
						</ReactBootstrap.Form.Label>
						<ReactBootstrap.Col sm={8}>
							<ReactBootstrap.Form.Control
								required
								type="number"
								placeholder="Amount"
								onChange={(e) => {
									setAmount(e.target.value);
								}}
							/>
						</ReactBootstrap.Col>
						<ReactBootstrap.Form.Control.Feedback>Looks good!</ReactBootstrap.Form.Control.Feedback>
					</ReactBootstrap.Form.Group>
					<ReactBootstrap.Modal.Footer>
						<ReactBootstrap.Button type="submit">Submit</ReactBootstrap.Button>
						<ReactBootstrap.Button onClick={props.onHide}>Close</ReactBootstrap.Button>
					</ReactBootstrap.Modal.Footer>
				</ReactBootstrap.Form>
			</ReactBootstrap.Modal.Body>
		</ReactBootstrap.Modal>
	);
}
export default MyVerticallyCenteredModalAccount;
