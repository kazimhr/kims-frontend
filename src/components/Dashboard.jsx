import React from 'react';
import { Card, Table } from 'react-bootstrap';
import inventoryService from '../services/InventoryServices';
import saleService from '../services/SaleServices';
import accountService from '../services/AccountServices';
import userService from '../services/UserServices';

const Dashboard = () => {
	const [ productCount, setProductCount ] = React.useState(0);
	const [ saleCount, setSaleCount ] = React.useState(0);
	const [ inflow, setInflow ] = React.useState(0);
	const [ outflow, setOutflow ] = React.useState(0);
	const [ products, setProducts ] = React.useState([]);
	const [ sales, setSales ] = React.useState([]);

	const getProductCount = () => {
		inventoryService
			.getinventorycount()
			.then((data) => {
				setProductCount(data);
			})
			.catch((err) => console.log(err));
	};

	const getSaleCount = () => {
		saleService
			.getsalecount()
			.then((data) => {
				setSaleCount(data);
			})
			.catch((err) => console.log(err));
	};

	const getinflow = () => {
		accountService
			.getaccountinflow()
			.then((data) => {
				var sum = 0;
				for (var x = 0; x < data.length; x++) {
					sum += data[x].amount;
				}
				setInflow(sum);
			})
			.catch((err) => console.log(err));
	};
	const getoutflow = () => {
		accountService
			.getaccountoutflow()
			.then((data) => {
				var sum = 0;
				for (var x = 0; x < data.length; x++) {
					sum += data[x].amount;
				}
				setOutflow(sum);
			})
			.catch((err) => console.log(err));
	};

	const getProductQnty = () => {
		inventoryService
			.getinventoryqnty()
			.then((data) => {
				setProducts(data);
			})
			.catch((err) => console.log(err));
	};

	const getSalesDue = () => {
		saleService
			.getsaledue()
			.then((data) => {
				setSales(data);
			})
			.catch((err) => console.log(err));
	};

	React.useEffect(getProductCount, []);
	React.useEffect(getSaleCount, []);
	React.useEffect(getinflow, []);
	React.useEffect(getoutflow, []);
	React.useEffect(getProductQnty, []);
	React.useEffect(getSalesDue, []);

	const renderProducts = (products, index) => {
		return (
			<tr key={index}>
				<td>{products.product_id}</td>
				<td>{products.product_name}</td>
				<td>{products.product_qnty}</td>
				<td>{products.company}</td>
				<td>{products.price}</td>
			</tr>
		);
	};

	const renderSales = (sales, index) => {
		return (
			<tr key={index}>
				<td>{sales.salesman_id}</td>
				<td>{sales.salesman_name}</td>
				<td>{sales.salesman_contact}</td>
				<td>{sales.credit_due}</td>
			</tr>
		);
	};

	return (
		<div className="content-div">
			<h1 className="page-heading">Dashboard</h1>
			{!userService.isLoggedIn() && (
				<h1 style={{ textAlign: 'center', marginTop: '60px' }}>Log in to see details!</h1>
			)}
			{userService.isLoggedIn() && (
				<div className="container" style={{ marginTop: '50px', marginBottom: '100px' }}>
					<div className="row" style={{ textAlign: 'center' }}>
						<div className="col-lg-3">
							<Card
								bg={'Secondary'.toLowerCase()}
								text={'Secondary'.toLowerCase() === 'light' ? 'dark' : 'white'}
								style={{ width: '16rem' }}
								className=" mr-3"
							>
								<Card.Header>Total Products</Card.Header>
								<Card.Body>
									<Card.Title>{productCount}</Card.Title>
								</Card.Body>
							</Card>
						</div>
						<div className="col-lg-3">
							<Card
								bg={'Dark'.toLowerCase()}
								text={'Dark'.toLowerCase() === 'light' ? 'dark' : 'white'}
								style={{ width: '16rem' }}
								className="mr-3"
							>
								<Card.Header>Total Sales People</Card.Header>
								<Card.Body>
									<Card.Title> {saleCount} </Card.Title>
								</Card.Body>
							</Card>
						</div>
						<div className="col-lg-3">
							<Card
								bg={'Success'.toLowerCase()}
								text={'Success'.toLowerCase() === 'light' ? 'dark' : 'white'}
								style={{ width: '16rem' }}
								className="mr-3"
							>
								<Card.Header>Current Month Inflow</Card.Header>
								<Card.Body>
									<Card.Title> Rs.{inflow}/-</Card.Title>
								</Card.Body>
							</Card>
						</div>
						<div className="col-lg-3">
							<Card
								bg={'Danger'.toLowerCase()}
								text={'Danger'.toLowerCase() === 'light' ? 'dark' : 'white'}
								style={{ width: '16rem' }}
								className=""
							>
								<Card.Header>Current Month Outflow</Card.Header>
								<Card.Body>
									<Card.Title>Rs.{outflow}/-</Card.Title>
								</Card.Body>
							</Card>
						</div>
					</div>

					<div className="data-table">
						<h5 style={{ marginTop: '50px' }}>Products less than 100</h5>
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>Id</th>
									<th>Product Name</th>
									<th>Product Quantity</th>
									<th>Company</th>
									<th>Unit Price</th>
								</tr>
							</thead>
							<tbody>{products.map(renderProducts)}</tbody>
						</Table>
					</div>
					<div className="data-table">
						<h5 style={{ marginTop: '50px' }}>Sales People whose credit due is more then 1000</h5>
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>Id</th>
									<th>Name</th>
									<th>Contact</th>
									<th>Credit Due</th>
								</tr>
							</thead>
							<tbody>{sales.map(renderSales)}</tbody>
						</Table>
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
