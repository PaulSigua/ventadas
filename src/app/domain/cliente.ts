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
    detalles?: Detalle[];
}

export class Categoria {
    codigo?: string;
    nombre?: string;
}

export class Producto {
    codigo?: any;
    nombre?: string;
    precio?: number;
    categoria?: Categoria;
    imagen?: string;
    caracteristicas: any;
    descripcionGeneral: any;
}

export class MensajeUsuario {
    nombre?: string;
    correo?: string;
    mensaje?: string;
}

export class Carrito {
    codigo?: number;
    detalles?: DetalleCarrito;
    detalle?: number;
}

export class DetalleCarrito {
    codigo?: number;
    carrito?: number;
    producto?: number;
    nombreProducto?: string;
    cantidad?: number;
    total?: number;
    subtotal?: number;
    imagenProducto?: string;
    caracteristica?: string;
}

export class CargarProducto {
    carrito?: number;
    producto?: number;
    cantidad?: number;
}

export class CargarCuentaCarrito {
    cuenta?: number;
    carrito?: Carrito;
}