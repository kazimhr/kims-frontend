import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import InvoiceAdd from './invoice-add';
// import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import invoiceService from '../../services/InvoiceServices';
import userService from '../../services/UserServices';

//main function of inventory
const Invoice = (props) => {
	const [ invoice, setInvoice ] = React.useState([]);
	const [ modalShow, setModalShow ] = React.useState(false);
	// const [ modalShowupdate, setModalShowupdate ] = React.useState(false);

	const getInvoices = () => {
		invoiceService
			.getinvoice()
			.then((data) => {
				setInvoice(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	React.useEffect(getInvoices, []);

	const getProductDetails = (invoice) => {
		let content = [];
		for (let i = 0; i < invoice.product_details.length; i++) {
			content.push(
				<tr key={i}>
					<td>{invoice.product_details[i].product_id}</td>
					<td>{invoice.product_details[i].qnty}</td>
				</tr>
			);
		}
		return content;
	};

	function renderProductsDetails(invoice) {
		return getProductDetails(invoice);
	}

	const renderProducts = (invoice, index) => {
		return (
			<tr key={index}>
				<td>{invoice.salesman_id}</td>
				<td style={{ textAlign: 'center' }}>
					<table style={{ width: '80%', margin: 'auto' }}>
						<thead>
							<tr>
								<th>Product Id</th>
								<th>Quantity</th>
							</tr>
						</thead>
						<tbody>{renderProductsDetails(invoice)}</tbody>
					</table>
				</td>
				<td>{invoice.total}</td>
				<td>
					<Fab
						size="small"
						aria-label="delete"
						onClick={(e) => {
							invoiceService
								.deleteinvoice(invoice._id)
								.then((data) => {
									getInvoices();
								})
								.catch((err) => {
									console.log(err);
								});
						}}
					>
						<DeleteIcon />
					</Fab>
				</td>
			</tr>
		);
	};

	//main return
	return (
		<div className="content-div">
			<h1 className="page-heading">Invoices</h1>
			<Fab
				color="primary"
				className="btn-add-refresh"
				onClick={getInvoices}
				disabled={userService.isLoggedIn() ? false : true}
			>
				<RefreshIcon />
			</Fab>
			<Fab
				color="primary"
				aria-label="add"
				className="btn-add-inventory"
				onClick={() => setModalShow(true)}
				disabled={userService.isLoggedIn() ? false : true}
			>
				<AddIcon />
			</Fab>
			<InvoiceAdd show={modalShow} onHide={() => setModalShow(false)} />
			<div className="data-table">
				<ReactBootstrap.Table striped bordered hover>
					<thead>
						<tr>
							<th>Salesman Id</th>
							<th style={{ width: '40%' }}>Product Details</th>
							<th style={{ width: '20%' }}>Total</th>
							<th style={{ width: '20%' }}>Actions</th>
						</tr>
					</thead>
					{userService.isLoggedIn() && <tbody>{invoice.map(renderProducts)}</tbody>}
				</ReactBootstrap.Table>
			</div>
		</div>
	);
};

export default Invoice;
