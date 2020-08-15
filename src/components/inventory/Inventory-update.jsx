import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import inventoryService from '../../services/InventoryServices';

function MyVerticallyCenteredModalUpdate(props) {
	const [ validated, setValidated ] = React.useState(false);
	const [ product_id, setProduct_id ] = React.useState(0);
	const [ product_name, setProduct_name ] = React.useState('');
	const [ product_qnty, setProduct_qnty ] = React.useState(0);
	const [ company, setCompany ] = React.useState('');
	const [ price, setPrice ] = React.useState(0);
	const [ compError, setCompError ] = React.useState(false);

	React.useEffect(
		() => {
			setProduct_id(props.prod_id);
			setProduct_name(props.prod_name);
			setProduct_qnty(props.prod_qnty);
			setCompany(props.prod_company);
			setPrice(props.prod_price);
		},
		[ props.prod_id, props.prod_name, props.prod_qnty, props.prod_company, props.prod_price ]
	);

	const handleSubmit = async (event) => {
		setCompError(false);
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else if (company === '' || company === 'Choose the company') {
			setCompError(true);
			event.preventDefault();
			event.stopPropagation();
		} else {
			setProduct_id(props.prod_id);
			setValidated(true);
			inventoryService
				.updateinventory(product_id, { product_id, product_name, product_qnty, company, price })
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
								value={product_id}
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
							Product Name
						</ReactBootstrap.Form.Label>
						<ReactBootstrap.Col sm={8}>
							<ReactBootstrap.Form.Control
								value={product_name}
								required
								type="text"
								placeholder="Name"
								onChange={(e) => {
									setProduct_name(e.target.value);
								}}
							/>
						</ReactBootstrap.Col>
						<ReactBootstrap.Form.Control.Feedback>Looks good!</ReactBootstrap.Form.Control.Feedback>
					</ReactBootstrap.Form.Group>
					<ReactBootstrap.Form.Group as={ReactBootstrap.Row} controlId="validationCustom03">
						<ReactBootstrap.Form.Label column sm={4}>
							Product Quantity
						</ReactBootstrap.Form.Label>
						<ReactBootstrap.Col sm={8}>
							<ReactBootstrap.Form.Control
								value={product_qnty}
								required
								min="0"
								type="number"
								placeholder="Quantity"
								onChange={(e) => {
									setProduct_qnty(e.target.value);
								}}
							/>
						</ReactBootstrap.Col>
						<ReactBootstrap.Form.Control.Feedback>Looks good!</ReactBootstrap.Form.Control.Feedback>
					</ReactBootstrap.Form.Group>
					<ReactBootstrap.Form.Group as={ReactBootstrap.Row} controlId="validationCustom03">
						<ReactBootstrap.Form.Label column sm={4}>
							Product Unit Price
						</ReactBootstrap.Form.Label>
						<ReactBootstrap.Col sm={8}>
							<ReactBootstrap.Form.Control
								value={price}
								required
								min="0"
								type="number"
								placeholder="Unit Price"
								onChange={(e) => {
									setPrice(e.target.value);
								}}
							/>
						</ReactBootstrap.Col>
						<ReactBootstrap.Form.Control.Feedback>Looks good!</ReactBootstrap.Form.Control.Feedback>
					</ReactBootstrap.Form.Group>
					<ReactBootstrap.Form.Group as={ReactBootstrap.Row} controlId="validationCustom04">
						<ReactBootstrap.Form.Label column sm={4}>
							Company
						</ReactBootstrap.Form.Label>
						<ReactBootstrap.Form.Group controlId="exampleForm.SelectCustom">
							<ReactBootstrap.Col sm={12}>
								<ReactBootstrap.Form.Control
									value={company}
									required
									as="select"
									custom
									onChange={(e) => {
										setCompany(e.target.value);
									}}
								>
									<option defaultValue>Choose the company</option>
									<option>Lipton Pvt Limited</option>
									<option>Kurleez</option>
									<option>Lay's</option>
									<option>Nescafe</option>
								</ReactBootstrap.Form.Control>
							</ReactBootstrap.Col>
							<span className={compError === true ? 'err-normal' : 'err-hidden'}>
								Please choose a company
							</span>
						</ReactBootstrap.Form.Group>
						<ReactBootstrap.Form.Control.Feedback>Looks good!</ReactBootstrap.Form.Control.Feedback>
					</ReactBootstrap.Form.Group>
					<ReactBootstrap.Modal.Footer>
						<ReactBootstrap.Button type="submit">Submit</ReactBootstrap.Button>

						<span
							onClick={() => {
								setProduct_name(props.prod_name);
								setProduct_qnty(props.prod_qnty);
								setCompany(props.prod_company);
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
