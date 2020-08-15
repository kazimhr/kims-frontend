import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import accountService from '../../services/AccountServices';
import RefreshIcon from '@material-ui/icons/Refresh';
import userService from '../../services/UserServices';
import MyVerticallyCenteredModalAccount from './Account-add';
import MyVerticallyCenteredModalAccountUpdate from './Account-update';

//main function of account
const Account = (props) => {
	const [ record, setRecords ] = React.useState([]);
	const [ modalShow, setModalShow ] = React.useState(false);
	const [ modalShowupdate, setModalShowupdate ] = React.useState(false);
	const [ id, setId ] = React.useState('');
	const [ flow, setFlow ] = React.useState('');
	const [ amount, setAmount ] = React.useState(0);

	//modal function that contains the body of the modal

	//funntion that performs axios get request
	const getRecords = () => {
		accountService
			.getaccount()
			.then((data) => {
				setRecords(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// getProducts(); this will be called infinite times because react re-renders the page upon the change in product variable hence we use effects in react.

	React.useEffect(getRecords, []); // this effect will limit the number of times getProduct is called
	// this effect will limit the number of times getProduct is called

	//function to renders the product got from the api to display in a table on the page
	const renderRecords = (records, index) => {
		return (
			<tr key={index}>
				<td>{records.flow}</td>
				<td>{records.amount}</td>
				<td>{records.date}</td>
				<td>
					<Fab
						size="small"
						aria-label="edit"
						style={{ marginRight: '20px' }}
						onClick={(e) => {
							setModalShowupdate(true);
							accountService
								.getSingleaccount(records._id)
								.then((data) => {
									setId(data._id);
									setFlow(data.flow);
									setAmount(data.amount);
									getRecords();
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
							accountService
								.deleteaccount(records._id)
								.then((data) => {
									console.log('deleted first');
									getRecords();
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
			<h1 className="page-heading">Accounts</h1>
			<Fab color="primary" className="btn-add-refresh" onClick={getRecords}>
				<RefreshIcon />
			</Fab>
			<Fab color="primary" aria-label="add" className="btn-add-inventory" onClick={() => setModalShow(true)}>
				<AddIcon />
			</Fab>
			<MyVerticallyCenteredModalAccount show={modalShow} onHide={() => setModalShow(false)} />
			<MyVerticallyCenteredModalAccountUpdate
				show={modalShowupdate}
				onHide={() => setModalShowupdate(false)}
				id={id}
				flow={flow}
				amount={amount}
				onSubmit={getRecords}
			/>

			{/* div that displays the table containing data */}
			<div className="data-table">
				<ReactBootstrap.Table striped bordered hover>
					<thead>
						<tr>
							<th>Flow</th>
							<th>Amount</th>
							<th>Date</th>
							<th style={{ width: '20%' }}>Actions</th>
						</tr>
					</thead>
					<tbody>{record.map(renderRecords)}</tbody>
				</ReactBootstrap.Table>
			</div>
		</div>
	);
};

export default Account;
