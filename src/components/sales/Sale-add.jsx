import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import saleService from '../../services/SaleServices';

function MyVerticallyCenteredModal(props) {
	const [ validated, setValidated ] = React.useState(false);
	const [ salesman_id, setSalesman_id ] = React.useState(0);
	const [ salesman_name, setSalesman_name ] = React.useState('');
	const [ salesman_contact, setSalesman_contact ] = React.useState(0);
	const [ credit_due, setCredit_due ] = React.useState(0);
	const [ idcheck, setIdcheck ] = React.useState(false);

	const Idchecking = async (prod_id) => {
		saleService
			.getSinglesale(prod_id)
			.then((data) => {
				if (typeof data != 'string') {
					setIdcheck(true);
					setValidated(false);
				} else {
					setIdcheck(false);
				}
			})
			.catch((err) => {
				setIdcheck(false);
			});
	};

	const handleSubmit = async (event) => {
		setIdcheck(false);
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else if (idcheck === true) {
			setValidated(false);
		} else {
			setValidated(true);
			saleService
				.addsale({
					salesman_id,
					salesman_name,
					salesman_contact,
					credit_due
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
		<ReactBootstrap.Modal
			{...props}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			backdrop="static"
		>
			<ReactBootstrap.Modal.Header>
				<ReactBootstrap.Modal.Title id="contained-modal-title-vcenter">
					Add New SalesPerson
				</ReactBootstrap.Modal.Title>
			</ReactBootstrap.Modal.Header>
			<ReactBootstrap.Modal.Body>
				<ReactBootstrap.Form validated={validated} onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
					<ReactBootstrap.Form.Group as={ReactBootstrap.Row} controlId="validationCustom01">
						<ReactBootstrap.Form.Label column sm={4}>
							ID
						</ReactBootstrap.Form.Label>
						<ReactBootstrap.Col sm={8}>
							<ReactBootstrap.Form.Control
								type="number"
								required
								placeholder="Unique ID"
								min="0"
								onBlur={() => Idchecking(salesman_id)}
								onChange={(e) => {
									setSalesman_id(e.target.value);
								}}
							/>
							<span className={idcheck === true ? 'err-normal' : 'err-hidden'}>
								Please enter a unique Id.
							</span>
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
								required
								type="tel"
								pattern="[0-9]{4}[0-9]{7}"
								placeholder="XXXXXXXXXXX"
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
						<ReactBootstrap.Button type="submit" disabled={idcheck === true ? true : false}>
							Submit
						</ReactBootstrap.Button>

						<span
							onClick={() => {
								setIdcheck(false);
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
export default MyVerticallyCenteredModal;
