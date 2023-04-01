class Docks {

    currentDock;

    constructor() {
        this.createDocks();
    }

    createDocks() {
        let dockbutton1 = document.getElementById("dockbutton1");
        dockbutton1.onclick = () => {
            this.changeDocks(1);
        }

        let dockbutton2 = document.getElementById("dockbutton2");
        dockbutton2.onclick = () => {
            this.changeDocks(2);
        }

        this.changeDocks(1);
    }

    changeDocks(docknumber) {
        this.currentDock = docknumber;
        if (docknumber == 1) {
            document.getElementById("dock1").style.visibility = 'visible';
            document.getElementById("dock2").style.visibility = 'hidden';
        }
        else {
            document.getElementById("dock1").style.visibility = 'hidden';
            document.getElementById("dock2").style.visibility = 'visible';
        }
    }
    
    getDockNumber() {
        return this.currentDock;
    }
}