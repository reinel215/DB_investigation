const officegen = require('officegen')
const fs = require('fs')

class Hero {

    constructor(proyecto) {
        this.proyecto = proyecto;
    }

    generar_informe(){
        let docx = officegen('docx');
        docx.on('finalize', function(written) {
            console.log(
              'Finish to create a Microsoft Word document.'
            )
        });
        //Crea parrafo.
        let pObj = docx.createP();
        //Crea una nueva pagina.
        docx.putPageBreak()
    }

}