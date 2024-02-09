export class Cliente {
    codigo?: number;
    dni?: string;
    nombre?: string;
    direccion?: string;
}

export class Detalle {
    nombre?: string;
    cantidad?: number;
    precio?: number;
}

export class Factura {
    codigo?: number;
    numero?: string;
    cliente?: Cliente;
    total?: number;
    fechaEmision?: string;
    detalles?: Detalle [];
}

export class Categoria {
    codigo?: string;
    nombre?: string;
}

export class Producto {
    codigo?: number;
    nombre?: string;
    precio?: number;
    categoria?: Categoria;
    imagen?: string;
}

export class MensajeUsuario {
    nombre?: string;
    correo?: string;
    mensaje?: string;
}