import GenericService from './GenericServices';
class InvoiceService extends GenericService {
	constructor() {
		super();
	}

	addinvoice = (data) => this.post('invoice/post', data);
	deleteinvoice = (_id) => this.delete('invoice/' + _id);
	updateinvoice = (_id, data) => this.put('invoice/' + _id, data);
	getinvoice = () => this.get('invoice');
	getSingleinvoice = (id) => this.get('invoice/' + id);
	getSingledetail = (id) => this.get('invoice/detail/' + id);
}

let invoiceService = new InvoiceService();
export default invoiceService;
