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