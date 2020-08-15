import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MyVerticallyCenteredModal from './Sale-add';
import MyVerticallyCenteredModalUpdate from './Sale-update';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import userService from '../../services/UserServices';
import saleService from '../../services/SaleServices';
import ModalSaleCredit from './Sale-creditUpdate';

const Sale = (props) => {
	const [ products, setProducts ] = React.useState([]);
	const [ modalShow, setModalShow ] = React.useState(false);
	const [ modalShowupdate, setModalShowupdate ] = React.useState(false);
	const [ modalCredit, setModalCredit ] = React.useState(false);
	const [ sale_id, setSaleId ] = React.useState(0);
	const [ sale_name, setSaleName ] = React.useState('');
	const [ sale_contact, setSaleContact ] = React.useState(0);
	const [ sale_creditdue, setSaleCredit ] = React.useState(0);

	const getProducts = () => {
		saleService
			.getsale()
			.then((data) => {
				setProducts(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	React.useEffect(getProducts, []);

	const renderProducts = (products, index) => {
		return (
			<tr key={index}>
				<td>{products.salesman_id}</td>
				<td>{products.salesman_name}</td>
				<td>{products.salesman_contact}</td>
				<td>{products.credit_due}</td>
				<td>
					<Fab
						size="small"
						aria-label="edit"
						style={{ marginRight: '20px' }}
						onClick={(e) => {
							setModalShowupdate(true);
							// setSaleId(products.salesman_id);
							saleService
								.getSinglesale(products.salesman_id)
								.then((data) => {
									setSaleId(data.salesman_id);
									setSaleName(data.salesman_name);
									setSaleContact(data.salesman_contact);
									setSaleCredit(data.credit_due);
									getProducts();
								})
								.catch((err) => {
									console.log(err);
								});
						}}
						disabled={userService.isAdmin() ? false : true}
					>
						<EditIcon />
					</Fab>
					<Fab
						size="small"
						aria-label="delete"
						style={{ marginRight: '20px' }}
						onClick={(e) => {
							saleService
								.deletesale(products.salesman_id)
								.then((data) => {
									console.log('deleted first');
									getProducts();
								})
								.catch((err) => {
									console.log(err);
								});
						}}
						disabled={userService.isAdmin() ? false : true}
					>
						<DeleteIcon />
					</Fab>
					<Fab
						color=""
						aria-label="add"
						size="small"
						onClick={(e) => {
							setModalCredit(true);
							setSaleId(products.salesman_id);
						}}
					>
						<AddIcon />
					</Fab>
				</td>
			</tr>
		);
	};

	//main return
	return (
		<div className="content-div">
			<h1 className="page-heading">Sales People</h1>
			<Fab
				color="primary"
				className="btn-add-refresh"
				onClick={getProducts}
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

			{/* div that displays the table containing data */}
			<div className="data-table">
				<ReactBootstrap.Table striped bordered hover>
					<thead>
						<tr>
							<th>Id</th>
							<th>Name</th>
							<th>Contact</th>
							<th>Credit Due</th>
							<th style={{ width: '20%' }}>Actions</th>
						</tr>
					</thead>
					{userService.isLoggedIn() && <tbody>{products.map(renderProducts)}</tbody>}
				</ReactBootstrap.Table>
			</div>

			<MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
			<MyVerticallyCenteredModalUpdate
				show={modalShowupdate}
				onHide={() => setModalShowupdate(false)}
				sale_id={sale_id}
				sale_name={sale_name}
				sale_contact={sale_contact}
				sale_creditdue={sale_creditdue}
				onSubmit={getProducts}
			/>
			<ModalSaleCredit show={modalCredit} onHide={() => setModalCredit(false)} id={sale_id} />
		</div>
	);
};

export default Sale;
