let docks = new Docks();

let form = new Form();
form.resetForm();

let conveyorbelts = new Conveyorbelt(docks);
conveyorbelts.addConveyorbelt(1);
conveyorbelts.addConveyorbelt(2);

let weather = new Weather("s'Hertogenbosch");