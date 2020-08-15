import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import saleService from '../../services/SaleServices';

function ModalSaleCredit(props) {
	const [ validated, setValidated ] = React.useState(false);
	const [ creditReleased, setCreditReleased ] = React.useState(0);

	const handleSubmit = async (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			saleService
				.updatesalecredit(props.id, { creditReleased })
				.then((data) => console.log(data))
				.catch((err) => console.log(err));
		}
	};

	return (
		<ReactBootstrap.Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
			<ReactBootstrap.Modal.Header closeButton>
				<ReactBootstrap.Modal.Title id="contained-modal-title-vcenter">Add Credit</ReactBootstrap.Modal.Title>
			</ReactBootstrap.Modal.Header>
			<ReactBootstrap.Modal.Body>
				<ReactBootstrap.Form validated={validated} onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
					<ReactBootstrap.Form.Group as={ReactBootstrap.Row} controlId="validationCustom03">
						<ReactBootstrap.Form.Label column sm={4}>
							Credit Released
						</ReactBootstrap.Form.Label>
						<ReactBootstrap.Col sm={8}>
							<ReactBootstrap.Form.Control
								value={creditReleased}
								required
								min="0"
								type="number"
								placeholder="Credit Due"
								onChange={(e) => setCreditReleased(e.target.value)}
							/>
						</ReactBootstrap.Col>
						<ReactBootstrap.Form.Control.Feedback>Looks good!</ReactBootstrap.Form.Control.Feedback>
					</ReactBootstrap.Form.Group>
					<ReactBootstrap.Modal.Footer>
						<ReactBootstrap.Button type="submit">Submit</ReactBootstrap.Button>

						<ReactBootstrap.Button
							onClick={(e) => {
								props.onHide();
								setCreditReleased(0);
							}}
						>
							Close
						</ReactBootstrap.Button>
					</ReactBootstrap.Modal.Footer>
				</ReactBootstrap.Form>
			</ReactBootstrap.Modal.Body>
		</ReactBootstrap.Modal>
	);
}
export default ModalSaleCredit;
