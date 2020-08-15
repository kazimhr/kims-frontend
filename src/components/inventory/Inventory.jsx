import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MyVerticallyCenteredModal from './Inventory-add';
import MyVerticallyCenteredModalUpdate from './Inventory-update';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import inventoryService from '../../services/InventoryServices';
import RefreshIcon from '@material-ui/icons/Refresh';
import userService from '../../services/UserServices';

//main function of inventory
const Inventory = (props) => {
	const [ products, setProducts ] = React.useState([]);
	const [ modalShow, setModalShow ] = React.useState(false);
	const [ modalShowupdate, setModalShowupdate ] = React.useState(false);
	const [ prod_id, setProduct_id ] = React.useState(0);
	const [ prod_name, setProduct_name ] = React.useState('');
	const [ prod_qnty, setProduct_qnty ] = React.useState(0);
	const [ prod_company, setCompany ] = React.useState('');
	const [ prod_price, setPrice ] = React.useState(0);

	//modal function that contains the body of the modal

	//funntion that performs axios get request
	const getProducts = () => {
		inventoryService
			.getinventory()
			.then((data) => {
				setProducts(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// getProducts(); this will be called infinite times because react re-renders the page upon the change in product variable hence we use effects in react.

	React.useEffect(getProducts, []); // this effect will limit the number of times getProduct is called
	// this effect will limit the number of times getProduct is called

	//function to renders the product got from the api to display in a table on the page
	const renderProducts = (products, index) => {
		return (
			<tr key={index}>
				<td>{products.product_id}</td>
				<td>{products.product_name}</td>
				<td>{products.product_qnty}</td>
				<td>{products.company}</td>
				<td>{products.price}</td>
				<td>
					<Fab
						size="small"
						aria-label="edit"
						style={{ marginRight: '20px' }}
						onClick={(e) => {
							setModalShowupdate(true);
							// setProduct_id(products.product_id);
							inventoryService
								.getSingleinventory(products.product_id)
								.then((data) => {
									setProduct_id(data.product_id);
									setProduct_name(data.product_name);
									setProduct_qnty(data.product_qnty);
									setCompany(data.company);
									setPrice(data.price);
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
						onClick={(e) => {
							inventoryService
								.deleteinventory(products.product_id)
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
				</td>
			</tr>
		);
	};

	//main return
	return (
		<div className="content-div">
			<h1 className="page-heading">Inventory</h1>
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
			<MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
			<MyVerticallyCenteredModalUpdate
				show={modalShowupdate}
				onHide={() => setModalShowupdate(false)}
				prod_id={prod_id}
				prod_name={prod_name}
				prod_qnty={prod_qnty}
				prod_company={prod_company}
				prod_price={prod_price}
				onSubmit={getProducts}
			/>

			{/* div that displays the table containing data */}
			<div className="data-table">
				<ReactBootstrap.Table striped bordered hover>
					<thead>
						<tr>
							<th>Id</th>
							<th>Product Name</th>
							<th>Product Quantity</th>
							<th>Company</th>
							<th>Unit Price</th>
							<th style={{ width: '20%' }}>Actions</th>
						</tr>
					</thead>
					{userService.isLoggedIn() && <tbody>{products.map(renderProducts)}</tbody>}
				</ReactBootstrap.Table>
			</div>
		</div>
	);
};

export default Inventory;
