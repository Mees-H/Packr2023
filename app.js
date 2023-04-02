let docks = new Docks();

let weather = new Weather("s'Hertogenbosch");

let form = new Form(weather);
form.resetForm();

let conveyorbelts = new Conveyorbelt(docks);
conveyorbelts.addConveyorbelt(1);
conveyorbelts.addConveyorbelt(2);
