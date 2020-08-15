import React from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import invoiceService from '../../services/InvoiceServices';
import inventoryService from '../../services/InventoryServices';
import saleService from '../../services/SaleServices';
import { toast } from 'react-toastify';

function InvoiceAdd(props) {
	const [ validated, setValidated ] = React.useState(false);
	const [ salesman_id, setSalesman ] = React.useState(0);
	const [ checkqnty, setCheckQnty ] = React.useState([]);
	const [ singlecost, setSingleCost ] = React.useState([]);
	const [ qntyError, setqntyError ] = React.useState(false);
	const [ addError, setAddError ] = React.useState(false);
	const [ salesError, setSalesError ] = React.useState(false);
	const [ product_details, setProduct_details ] = React.useState([
		{
			product_id: 0,
			qnty: 0
		}
	]);

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			toast.error('Cant leave fields empty.', {
				position: toast.POSITION.TOP_LEFT
			});
			event.preventDefault();
			event.stopPropagation();
		} else {
			setValidated(true);
			var total = 0;
			for (var i = 0; i < singlecost.length; i++) {
				total += singlecost[i];
			}

			invoiceService
				.addinvoice({ salesman_id, product_details, total })
				.then((data) => console.log(data))
				.catch((err) => console.log(err));

			setProduct_details([
				{
					product_id: 0,
					qnty: 0
				}
			]);
			setSalesman(0);
			setSingleCost([]);

			for (i = 0; i < product_details.length; i++) {
				var product_qnty = product_details[i].qnty;
				inventoryService
					.updateqntyinventory(product_details[i].product_id, { product_qnty })
					.then((data) => console.log(data))
					.catch((err) => console.log(err));
			}

			saleService
				.updatecreditsale(salesman_id, { total })
				.then((data) => console.log(data))
				.catch((err) => console.log(err));
		}
	};

	const handleChange = (e, index) => {
		const { name, value } = e.target;
		const list = [ ...product_details ];
		list[index][name] = value;
		setProduct_details(list);
	};

	const handleNewRow = () => {
		setProduct_details([ ...product_details, { product_id: 0, qnty: 0 } ]);
	};

	const handleRemove = (index) => {
		const list = [ ...product_details ];
		list.splice(index, 1);
		setProduct_details(list);
		const list2 = [ ...singlecost ];
		list2.splice(index, 1);
		setSingleCost(list2);
	};

	const getQuantity = (e, index, id) => {
		setAddError(false);
		setqntyError(false);
		const list = [ ...checkqnty ];
		inventoryService
			.getSingleinventory(id)
			.then((data) => {
				list[index] = data.product_qnty;
				setCheckQnty(list);
			})
			.catch((err) => {
				console.log(err);
				setqntyError(true);
			});
	};

	const handleQnty = (e, index) => {
		setAddError(false);
		const list = [ ...singlecost ];
		if (checkqnty[index] < product_details[index].qnty) {
			setAddError(true);
		} else {
			inventoryService.getSingleinventory(product_details[index].product_id).then((data) => {
				var pricing = product_details[index].qnty * data.price;
				list[index] = pricing;
				setSingleCost(list);
			});
		}
	};

	const checkSales = (e) => {
		setSalesError(false);
		saleService.getSinglesale(salesman_id).then((data) => {}).catch((err) => {
			console.log(err);
			setSalesError(true);
		});
	};

	const refresh = () => {
		props.onHide();
		setqntyError(false);
		setSalesman(0);
		setProduct_details([
			{
				product_id: 0,
				qnty: 0
			}
		]);
		setCheckQnty([]);
		setSingleCost([]);
		setSalesError(false);
		setAddError(false);
	};

	return (
		<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered backdrop="static">
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">Add New Invoice</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Form.Group
						as={Col}
						md="4"
						controlId="validationCustom01"
						style={{ textAlign: 'center', margin: 'auto', marginBottom: '20px' }}
					>
						<Form.Label>Salesman Id</Form.Label>
						<Form.Control
							required
							min="1"
							type="number"
							placeholder="Salesman Id"
							value={salesman_id}
							onChange={(e) => setSalesman(e.target.value)}
							onBlur={(e) => checkSales(e)}
						/>
						<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>
					<Form.Row>
						<span className={salesError === true ? 'err-normal' : 'err-hidden'}>
							Salesman with this id does not exist.
						</span>
					</Form.Row>
					{product_details.map((item, i) => {
						return (
							<Form.Row key={i}>
								<Form.Group as={Col} md="3" controlId="validationCustom01">
									<Form.Label>Product Id</Form.Label>
									<Form.Control
										required
										min="1"
										name="product_id"
										type="number"
										placeholder="Product Id"
										value={item.product_id}
										onChange={(e) => handleChange(e, i)}
										onBlur={(e) => {
											getQuantity(e, i, item.product_id);
										}}
									/>
									<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
								</Form.Group>

								<Form.Group as={Col} md="3" controlId="validationCustom02">
									<Form.Label>Avaliable Quantity</Form.Label>
									<Form.Control
										required
										type="number"
										placeholder="Avaliable Quantity"
										value={checkqnty[i]}
										disabled
									/>
									<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col} md="3" controlId="validationCustom02">
									<Form.Label>Quantity</Form.Label>
									<Form.Control
										required
										min="1"
										name="qnty"
										type="number"
										placeholder="Quantity"
										value={item.qnty}
										onChange={(e) => handleChange(e, i)}
										onBlur={(e) => handleQnty(e, i)}
										disabled={qntyError === true ? true : false}
									/>
									<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col} md="3" controlId="validationCustom02">
									<Form.Label>Cost</Form.Label>
									<Form.Control
										required
										type="number"
										placeholder="Cost"
										value={singlecost[i]}
										disabled
									/>
									<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
								</Form.Group>
								<Button hidden={i === 0 ? true : false} onClick={(e) => handleRemove(i)}>
									Remove
								</Button>
							</Form.Row>
						);
					})}
					<Form.Row>
						<span className={qntyError === true ? 'err-normal' : 'err-hidden'}>
							Product is not in Inventory.
						</span>
						<span className={addError === true ? 'err-normal' : 'err-hidden'}>
							Required Quantity is more.
						</span>
					</Form.Row>
					<Form.Row>
						<Button
							onClick={handleNewRow}
							style={{ width: '30%', margin: 'auto' }}
							disabled={addError || qntyError || salesError === true ? true : false}
						>
							Add
						</Button>
					</Form.Row>
					<Modal.Footer>
						<Button type="submit" disabled={addError || qntyError || salesError === true ? true : false}>
							Submit form
						</Button>
						<Button onClick={refresh}>Close</Button>
					</Modal.Footer>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default InvoiceAdd;
