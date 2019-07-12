const officegen = require('officegen');

module.exports.default = class Generador_Documento {

    constructor(proyecto,direccion) {
        this.proyecto = proyecto;
        this.direccion=direccion;
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

