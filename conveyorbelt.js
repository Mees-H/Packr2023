class Conveyorbelt {

    queue;
    
    constructor() {
        this.createConveyorbeltButton();
        
        this.queue = new ConveyorbeltQueue();
        
        let newPackage = new Package();
        newPackage.drawImage();
        this.queue.addPackageToQueue(newPackage);
    }

    addConveyorbelt() {
        let conveyorbelts = document.getElementById("conveyorbelts");
        let conveyorbeltRow = document.createElement("div");
        conveyorbeltRow.id = "conveyorbeltRow"; 


        let tube = document.createElement("img"); 
        tube.id = "tube";
        tube.className = "rotateimg180";
        tube.src = "https://static.wikia.nocookie.net/newersupermariobroswii/images/b/bf/Warp_pipe.png/revision/latest?cb=20181227070915";
        
        tube.onclick = () => {
            this.queue.getPackageFromQueue();
        };
        conveyorbeltRow.appendChild(tube);

        let conveyorbelt = document.createElement("img"); 
        conveyorbelt.id = "conveyorbelt"
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
}