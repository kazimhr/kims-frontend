import GenericService from './GenericServices';
class AccountService extends GenericService {
	constructor() {
		super();
	}
	addaccount = (data) => this.post('account/post', data);
	deleteaccount = (_id) => this.delete('account/' + _id);
	updateaccount = (_id, data) => this.put('account/' + _id, data);
	getaccount = () => this.get('account');
	getaccountinflow = () => this.get('account/inflow');
	getaccountoutflow = () => this.get('account/outflow');
	getSingleaccount = (id) => this.get('account/' + id);
}

let accountService = new AccountService();
export default accountService;
