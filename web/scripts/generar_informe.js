const officegen = require('officegen');
var fs = require('fs');

module.exports.default = class Generador_Documento {

    constructor(proyecto, direccion) {
        this.proyecto = proyecto;
        let conversion = direccion.split('/');
        let ruta='';
        for(let i= 0; i< conversion.length-1; i++){
            ruta= ruta + '/' + conversion[i];
        }
        this.direccion = ruta;
    }

    generar_informe() {
        let docx = officegen('docx');
        docx.on('finalize', function (written) {
            console.log(
                'Finish to create a Microsoft Word document.'
            )
        });
        //Crea parrafo.
        let pObj = docx.createP();
        //Crea una nueva pagina.
        pObj.options.align = 'center';
        pObj.addText('República Bolivariana de Venezuela'.toUpperCase(), { font_face: 'Times New Roman', font_size: 15, bold: true });
        pObj.addLineBreak();
        pObj.addText('Ministerio del Poder Popular para la Educación Superior'.toUpperCase(), { font_face: 'Times New Roman', font_size: 15, bold: true });
        pObj.addLineBreak();
        pObj.addText(this.proyecto.Investigacion.Entorno_Investigacion, { font_face: 'Times New Roman', font_size: 15, bold: true });
        pObj.addLineBreak();
        pObj.addLineBreak();
        pObj.addLineBreak();
        pObj.addText(this.proyecto.Investigacion.objetivo_general, { font_face: 'Times New Roman', font_size: 15, bold: true });
        pObj.addLineBreak();
        pObj.addLineBreak();
        pObj.addLineBreak();
        pObj.addLineBreak();
        pObj.addText('REALIZADO POR:', { font_face: 'Times New Roman', font_size: 12, bold: true });
        pObj.addLineBreak();
        pObj.addText('[Autores]', { font_face: 'Times New Roman', font_size: 12 });
        pObj.addLineBreak();
        pObj.addText('TUTOR: [Tutor]', { font_face: 'Times New Roman', font_size: 12, bold: true });
        pObj.addLineBreak();
        pObj.addText('FECHA [Fecha]', { font_face: 'Times New Roman', font_size: 9 });
        pObj.addLineBreak();
        pObj.putPageBreak();
        pObj.addText('Dedicatoria', { font_face: 'Times New Roman', font_size: 15 });
        pObj.addLineBreak();
        pObj.putPageBreak();
        pObj.addText('Agradecimientos', { font_face: 'Times New Roman', font_size: 15 });
        pObj.addLineBreak();
        pObj.putPageBreak();
        pObj.addText('Resumen', { font_face: 'Times New Roman', font_size: 15 });
        pObj.addLineBreak();
        pObj.addText(this.proyecto.Investigacion.objetivo_general, { font_face: 'Times New Roman', font_size: 14 });
        pObj.addLineBreak();
        pObj.putPageBreak();
        pObj.addText('Introduccion', { font_face: 'Times New Roman', font_size: 15, underline: true });
        pObj.addLineBreak();
        pObj.options.align = 'justify';
        pObj.addText('Planteamiento del Problema', { font_face: 'Times New Roman', font_size: 15, underline: true });
        pObj.addLineBreak();
        pObj.addText(this.proyecto.Problematica.nombre, { font_face: 'Times New Roman', font_size: 12, bold: true });
        pObj.addLineBreak();
        pObj.addText(this.proyecto.Problematica.descripcion, { font_face: 'Times New Roman', font_size: 12 });
        pObj.addLineBreak();
        this.proyecto.Problematica.causas_sintomas.forEach((causa_sintoma) => {
            pObj.addText(causa_sintoma.descripcion, { font_face: 'Times New Roman', font_size: 12 });
            pObj.addLineBreak();
        });
        pObj.addText('Objetivos', { font_face: 'Times New Roman', font_size: 13, underline: true });
        pObj.addLineBreak();
        pObj.addText('Objetivo General', { font_face: 'Times New Roman', font_size: 13, bold: true });
        pObj.addLineBreak();
        pObj.addText(this.proyecto.Investigacion.objetivo_general, { font_face: 'Times New Roman', font_size: 12, underline: true });
        pObj.addLineBreak();
        pObj.addText('Objetivos Especificos', { font_face: 'Times New Roman', font_size: 13, bold: true });
        pObj.addLineBreak();
        this.proyecto.Investigacion.estadios_aplicados.forEach((estadio) => {
            estadio.objetivos_especificos.forEach((objetivo) => {
                pObj.addText(objetivo, { font_face: 'Times New Roman', font_size: 12 });
                pObj.addLineBreak();
            });
        });
        pObj.addText('Alcances y limitaciones', { font_face: 'Times New Roman', font_size: 13, underline: true });
        pObj.addLineBreak();
        pObj.addText('Alcances', { font_face: 'Times New Roman', font_size: 12, bold: true });
        pObj.addLineBreak();
        this.proyecto.alcances.forEach((alcance) => {
            pObj.addText(alcance, { font_face: 'Times New Roman', font_size: 12 });
            pObj.addLineBreak();
        });
        pObj.addText('Limitaciones', { font_face: 'Times New Roman', font_size: 12, bold: true });
        pObj.addLineBreak();
        this.proyecto.restricciones.forEach((restriccion) => {
            pObj.addText(restriccion, { font_face: 'Times New Roman', font_size: 12 });
            pObj.addLineBreak();
        });
        pObj.putPageBreak();
        pObj.options.align = 'center';
        pObj.addText('Marco Referencial', { font_face: 'Times New Roman', font_size: 15, underline: true, bold: true });
        pObj.addLineBreak();
        pObj.options.align = 'justify';
        this.proyecto.unidades_informacion.forEach((unidad_info) => {
            unidad_info.citas.forEach((cita) => {
                if (cita.categoria_uso == 'Fundamentacion' || cita.categoria_uso == 'Justificacion') {
                    pObj.addText(cita.titulo, { font_face: 'Times New Roman', font_size: 14, bold: true });
                    pObj.addLineBreak();
                    pObj.addText(cita.subtitulo, { font_face: 'Times New Roman', font_size: 13, bold: true });
                    pObj.addLineBreak();
                    pObj.addText(cita.delimitacion, { font_face: 'Times New Roman', font_size: 12, underline: true });
                    pObj.addLineBreak();
                    pObj.addText(cita.cita + '[' + unidad_info.cita_ref + ']', { font_face: 'Times New Roman', font_size: 10 });
                    pObj.addLineBreak();
                }
            });
        });
        pObj.putPageBreak();
        pObj.options.align = 'center';
        pObj.addText('Marco Metodologico', { font_face: 'Times New Roman', font_size: 15, underline: true, bold: true });
        pObj.addLineBreak();
        pObj.options.align = 'justify';
        this.proyecto.unidades_informacion.forEach((unidad_info) => {
            unidad_info.citas.forEach((cita) => {
                if (cita.categoria_uso == 'Metodologia') {
                    pObj.addText(cita.titulo, { font_face: 'Times New Roman', font_size: 14, bold: true });
                    pObj.addLineBreak();
                    pObj.addText(cita.subtitulo, { font_face: 'Times New Roman', font_size: 13, bold: true });
                    pObj.addLineBreak();
                    pObj.addText(cita.delimitacion, { font_face: 'Times New Roman', font_size: 12, underline: true });
                    pObj.addLineBreak();
                    pObj.addText(cita.cita + '[' + unidad_info.cita_ref + ']', { font_face: 'Times New Roman', font_size: 10 });
                    pObj.addLineBreak();
                }
            });
        });
        pObj.addText(this.proyecto.Investigacion.tipo_investigacion, { font_face: 'Times New Roman', font_size: 12 });
        pObj.addLineBreak();
        pObj.addText(this.proyecto.Investigacion.Contexto.concepcion, { font_face: 'Times New Roman', font_size: 12 });
        pObj.addLineBreak();
        pObj.addText(this.proyecto.Investigacion.Contexto.descripcion, { font_face: 'Times New Roman', font_size: 12 });
        pObj.addLineBreak();
        pObj.addText(this.proyecto.Investigacion.Contexto.descripcion, { font_face: 'Times New Roman', font_size: 12 });
        pObj.addLineBreak();
        this.proyecto.Investigacion.estadios_aplicados.forEach((estadio) => {
            pObj.addText(this.proyecto.Investigacion.Contexto.descripcion, { font_face: 'Times New Roman', font_size: 12 });
            pObj.addLineBreak();
            estadio.eventos_delimitados.forEach((evento) => {
                pObj.addText(evento.clase_evento, { font_face: 'Times New Roman', font_size: 12 });
                pObj.addLineBreak();
                pObj.addText(evento.tipo_evento, { font_face: 'Times New Roman', font_size: 12 });
                pObj.addLineBreak();
                pObj.addText(evento.descripcion, { font_face: 'Times New Roman', font_size: 12 });
                pObj.addLineBreak();
                pObj.addText('Sinergias:', { font_face: 'Times New Roman', font_size: 12, underline: true });
                pObj.addLineBreak();
                evento.sinergias.forEach((sinergia) => {
                    pObj.addText(sinergia.nombre, { font_face: 'Times New Roman', font_size: 12 });
                    pObj.addLineBreak();
                    pObj.addText('Fuentes:', { font_face: 'Times New Roman', font_size: 12, underline: true });
                    pObj.addLineBreak();
                    sinergia.fuentes.forEach((fuente) => {
                        pObj.addText(fuente, { font_face: 'Times New Roman', font_size: 12 });
                        pObj.addLineBreak();
                    });
                    sinergia.aplicacion_instrumental.forEach((aplicacion) => {
                        pObj.addText('Instrumento: ' + aplicacion.instrumento, { font_face: 'Times New Roman', font_size: 12 });
                        pObj.addLineBreak();
                        pObj.addText(aplicacion.identificacion, { font_face: 'Times New Roman', font_size: 12 });
                        pObj.addLineBreak();
                        aplicacion.items.forEach((item) => {
                            pObj.addText('Item: ' + item.identificacion, { font_face: 'Times New Roman', font_size: 12 });
                            pObj.addLineBreak();
                            pObj.addText(item.contenido, { font_face: 'Times New Roman', font_size: 12 });
                            pObj.addLineBreak();
                            pObj.addText(item.tipo_item, { font_face: 'Times New Roman', font_size: 12 });
                            pObj.addLineBreak();
                            pObj.addText('Indicio:' + item.indicio, { font_face: 'Times New Roman', font_size: 12 });
                            pObj.addLineBreak();
                            pObj.addText(item.categoria.nivel_ausencia, { font_face: 'Times New Roman', font_size: 12 });
                            pObj.addLineBreak();
                            pObj.addText('terminos:' + item.categoria.terminos, { font_face: 'Times New Roman', font_size: 12 });
                            pObj.addLineBreak();
                            pObj.addText('escala' + item.categoria.escala, { font_face: 'Times New Roman', font_size: 12 });
                            pObj.addLineBreak();
                        });
                    });
                });
            });
        });
        pObj.putPageBreak();
        pObj.options.align = 'center';
        pObj.addText('Bibliografia', { font_face: 'Times New Roman', font_size: 15, underline: true, bold: true });
        pObj.addLineBreak();
        this.proyecto.unidades_informacion.forEach((unidad_info) => {
            pObj.addText(unidad_info.autor + ' . (' + unidad_info.fecha + '). ' + unidad_info.titulo + '[' + unidad_info.cita_ref + ']', { font_face: 'Times New Roman', font_size: 12 });
            pObj.addLineBreak();
        });

        let out = fs.createWriteStream(this.direccion + 'example.docx');

        out.on('error', function (err) {
            console.log(err)
        });

        // Async call to generate the output file:
        docx.generate(out);
    }

}

