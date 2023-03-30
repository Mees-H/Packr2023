class Conveyorbelt {

    queue;
    numberOfConveyorbelts;
    conveyorbeltDictionary;
    
    constructor() {
        this.conveyorbeltDictionary = [];
        this.numberOfConveyorbelts = 0;
        this.createConveyorbeltButton();
        
        this.queue = new ConveyorbeltQueue();
        
        let newPackage = new Package(1, 1, 0);
        // newPackage.drawImage();
        this.queue.addPackageToQueue(newPackage);
    }

    addConveyorbelt() {
        this.numberOfConveyorbelts +=1;
        let conveyorbelts = document.getElementById("conveyorbelts");
        let conveyorbeltRow = document.createElement("div");
        conveyorbeltRow.id = "conveyorbeltRow"; 


        let tube = document.createElement("img"); 
        tube.id = "tube"+this.numberOfConveyorbelts;
        tube.className = "tube rotateimg180";
        tube.src = "https://static.wikia.nocookie.net/newersupermariobroswii/images/b/bf/Warp_pipe.png/revision/latest?cb=20181227070915";
        
        tube.onclick = () => {
            let newPackage = this.queue.getPackageFromQueue();
            if(newPackage){
                newPackage.drawImage();
            }
            this.addPackageOnConveyorbelt(newPackage, 1);//todo change dynamic conveyorbelt
        };
        conveyorbeltRow.appendChild(tube);

        let conveyorbelt = document.createElement("img"); 
        conveyorbelt.id = "conveyorbelt"+this.numberOfConveyorbelts;
        conveyorbelt.className = "conveyorbelt";
        conveyorbelt.src = "https://thumbs.gfycat.com/FrailTanHarlequinbug-max-1mb.gif";
        conveyorbeltRow.appendChild(conveyorbelt);

        conveyorbelts.appendChild(conveyorbeltRow);
    }

    createConveyorbeltButton() {
        let form = document.getElementById("conveyerbeltform");

        let button = document.createElement("button");
        button.className = "btn btn-primary ml-2";
        button.textContent = "Create new conveyorbelt";
        button.id = "createnewconveyorbelt";

        button.onclick = () => {
            this.addConveyorbelt();
        };
        form.appendChild(button);
    }

    movePackageOnConveyorbelt(movingPackage, from, to) {

    }

    addPackageOnConveyorbelt(thePackage, conveyorbeltNumber) {
        if (this.conveyorbeltDictionary[conveyorbeltNumber]) {
            //not the first package
            this.conveyorbeltDictionary[conveyorbeltNumber].push(thePackage);
        }
        else {
            //first package
            this.conveyorbeltDictionary[conveyorbeltNumber] = {thePackage};
        }
    }
}