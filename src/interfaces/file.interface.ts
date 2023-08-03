export interface File {
    _id?:any;
    fileName: string; // Nombre del archivo
    originalName: string; // Nombre original del archivo
    mimeType: string; // Tipo MIME del archivo (por ejemplo, image/jpeg)
    filePath: string; // Ruta del archivo en el sistema de archivos
    createdAt: Date; // Fecha de creación del archivo
  }