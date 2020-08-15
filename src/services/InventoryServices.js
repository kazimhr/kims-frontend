import GenericService from './GenericServices';
class InventoryService extends GenericService {
	constructor() {
		super();
	}
	addinventory = (data) => this.post('inventory/post', data);
	deleteinventory = (_id) => this.delete('inventory/' + _id);
	updateinventory = (_id, data) => this.put('inventory/' + _id, data);
	updateqntyinventory = (_id, data) => this.put('inventory/qnty/' + _id, data);
	getinventory = () => this.get('inventory');
	getinventorycount = () => this.get('inventory/productcount');
	getinventoryqnty = () => this.get('inventory/productqnty');
	getSingleinventory = (id) => this.get('inventory/' + id);
}

let inventoryService = new InventoryService();
export default inventoryService;
