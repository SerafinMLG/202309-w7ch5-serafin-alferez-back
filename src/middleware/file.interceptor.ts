import { NextFunction, Request, Response } from 'express';
import multer from 'multer'


export class FileInterceptor {

  singleFileStore(fileName = 'file', fileSize = 8_000_000) {  
    const options: multer.Options = {
      // Ddest: 'uploads',     Decimos dónde se va a guardar el fichero de destino
      storage: multer.diskStorage({
        destination: './public/uploads',
        filename( _req, file, callback) {
            const prefix = crypto.randomUUID();   // La damos unos nombres de ficheros aleatorios pero siempre diferentes.
            callback(null, prefix + '-' + file.originalname);  // Originalname es palabra reservada
        }
      }),

      limits: { fileSize }   //
    }

    // Esta función es la generadora del middleware. fileSize es el tamaño MAXIMO, 8MB p.ej.
    const middleware = multer(options).single(fileName);
    
    return (req: Request, res: Response, next: NextFunction) => {
      const previousBody = req.body   // Guardamos el body antes de que Multer lo sobreescriba.
      middleware(req, res, next)


      req.body = {...previousBody, ...req.body }  // Añadimos lo que tenía antes en el body a lo que me añada Multer.
    }
    
  }

}
