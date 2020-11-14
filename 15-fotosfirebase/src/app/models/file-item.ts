


/**
 * Modelo de un archivo
 */
export class FileItem {


  /**
   * Archivo que se importara
   */
  public archivo: File;
  /**
   * Nombre del archivo
   */
  public nombreArchivo: string;
  public url: string;
  public estaSubiendo: boolean;
  public progreso: number;

  constructor(archivo: File) {
    this.archivo = archivo;
    this.nombreArchivo = archivo.name;

    this.estaSubiendo = false;
    this.progreso = 0;
  }

}
