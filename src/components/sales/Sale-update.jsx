import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import saleService from '../../services/SaleServices';

function MyVerticallyCenteredModalUpdate(props) {
	const [ validated, setValidated ] = React.useState(false);
	const [ salesman_id, setSalesman_id ] = React.useState(0);
	const [ salesman_name, setSalesman_name ] = React.useState('');
	const [ salesman_contact, setSalesman_contact ] = React.useState(0);
	const [ credit_due, setCredit_due ] = React.useState(0);

	React.useEffect(
		() => {
			setSalesman_id(props.sale_id);
			setSalesman_name(props.sale_name);
			setSalesman_contact(props.sale_contact);
			setCredit_due(props.sale_creditdue);
		},
		[ props.sale_id, props.sale_name, props.sale_contact, props.sale_creditdue ]
	);

	const handleSubmit = async (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			setSalesman_id(props.sale_id);
			setValidated(true);
			saleService
				.updatesale(salesman_id, { salesman_id, salesman_name, salesman_contact, credit_due })
				.then((data) => {
					props.onSubmit();
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<ReactBootstrap.Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
			<ReactBootstrap.Modal.Header closeButton>
				<ReactBootstrap.Modal.Title id="contained-modal-title-vcenter">Edit</ReactBootstrap.Modal.Title>
			</ReactBootstrap.Modal.Header>
			<ReactBootstrap.Modal.Body>
				<ReactBootstrap.Form validated={validated} onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
					<ReactBootstrap.Form.Group as={ReactBootstrap.Row} controlId="validationCustom01">
						<ReactBootstrap.Form.Label column sm={4}>
							Id
						</ReactBootstrap.Form.Label>
						<ReactBootstrap.Col sm={8}>
							<ReactBootstrap.Form.Control
								value={salesman_id}
								type="number"
								required
								placeholder="Unique id"
								min="0"
								disabled
							/>
						</ReactBootstrap.Col>
						<ReactBootstrap.Form.Control.Feedback>Looks good!</ReactBootstrap.Form.Control.Feedback>
						<span />
					</ReactBootstrap.Form.Group>
					<ReactBootstrap.Form.Group as={ReactBootstrap.Row} controlId="validationCustom02">
						<ReactBootstrap.Form.Label column sm={4}>
							Name
						</ReactBootstrap.Form.Label>
						<ReactBootstrap.Col sm={8}>
							<ReactBootstrap.Form.Control
								value={salesman_name}
								required
								type="text"
								placeholder="Name"
								onChange={(e) => {
									setSalesman_name(e.target.value);
								}}
							/>
						</ReactBootstrap.Col>
						<ReactBootstrap.Form.Control.Feedback>Looks good!</ReactBootstrap.Form.Control.Feedback>
					</ReactBootstrap.Form.Group>
					<ReactBootstrap.Form.Group as={ReactBootstrap.Row} controlId="validationCustom03">
						<ReactBootstrap.Form.Label column sm={4}>
							Contact
						</ReactBootstrap.Form.Label>
						<ReactBootstrap.Col sm={8}>
							<ReactBootstrap.Form.Control
								value={salesman_contact}
								required
								min="0"
								type="number"
								placeholder="Contact"
								onChange={(e) => {
									setSalesman_contact(e.target.value);
								}}
							/>
						</ReactBootstrap.Col>
						<ReactBootstrap.Form.Control.Feedback>Looks good!</ReactBootstrap.Form.Control.Feedback>
					</ReactBootstrap.Form.Group>
					<ReactBootstrap.Form.Group as={ReactBootstrap.Row} controlId="validationCustom03">
						<ReactBootstrap.Form.Label column sm={4}>
							Credit Due
						</ReactBootstrap.Form.Label>
						<ReactBootstrap.Col sm={8}>
							<ReactBootstrap.Form.Control
								value={credit_due}
								required
								min="0"
								type="number"
								placeholder="Credit Due"
								onChange={(e) => {
									setCredit_due(e.target.value);
								}}
							/>
						</ReactBootstrap.Col>
						<ReactBootstrap.Form.Control.Feedback>Looks good!</ReactBootstrap.Form.Control.Feedback>
					</ReactBootstrap.Form.Group>
					<ReactBootstrap.Modal.Footer>
						<ReactBootstrap.Button type="submit">Submit</ReactBootstrap.Button>
						<span
							onClick={() => {
								setSalesman_id(props.sale_id);
								setSalesman_name(props.sale_name);
								setSalesman_contact(props.sale_contact);
								setCredit_due(props.sale_creditdue);
							}}
						>
							<ReactBootstrap.Button onClick={props.onHide}>Close</ReactBootstrap.Button>
						</span>
					</ReactBootstrap.Modal.Footer>
				</ReactBootstrap.Form>
			</ReactBootstrap.Modal.Body>
		</ReactBootstrap.Modal>
	);
}
export default MyVerticallyCenteredModalUpdate;
