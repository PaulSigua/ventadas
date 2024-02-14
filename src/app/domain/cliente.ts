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
    cuenta?: Usuario;
}

export class DetalleCarrito {
    codigo?: number;
    carrito?: Carrito;
    producto?: Producto;
    cantidad?: number;
    precio?: number;
    subtotal?: number;
    total?: number;
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

export class Usuario {
    codigo?: any;
    nombre?: any;
    apellido?: any;
    correo?: any;
    cedula?: string;
    contrasenia?: any;
    accedio?: boolean;
}

export class Credenciales {
    codigo: any;
    correo?: string;
    contrasenia?: string;
}