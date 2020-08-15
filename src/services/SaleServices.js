import GenericService from './GenericServices';
class SaleService extends GenericService {
	constructor() {
		super();
	}
	addsale = (data) => this.post('sale/post', data);
	deletesale = (_id) => this.delete('sale/' + _id);
	updatesale = (_id, data) => this.put('sale/' + _id, data);
	updatecreditsale = (_id, data) => this.put('sale/credit/' + _id, data);
	getsale = () => this.get('sale');
	getsalecount = () => this.get('sale/salescount');
	getsaledue = () => this.get('sale/salesdue');
	getSinglesale = (id) => this.get('sale/' + id);
	updatesalecredit = (id, data) => this.put('sale/substract/' + id, data);
}

let saleService = new SaleService();
export default saleService;
