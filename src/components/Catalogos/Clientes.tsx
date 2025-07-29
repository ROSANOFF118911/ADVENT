import React, { useState } from 'react';
import { Users, Plus, Edit, Trash2, Search, Mail, Phone, MapPin, DollarSign } from 'lucide-react';

const Clientes: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [clientes, setClientes] = useState([
    {
      id: 1,
      nombre: 'Constructora ABC S.A. de C.V.',
      rfc: 'CABC123456789',
      status: 'Activo',
      telefono: '555-0123',
      correo: 'contacto@constructoraabc.com',
      direccion: 'Av. Reforma 123, Col. Centro',
      saldo: 85430.50,
      precioEspecial: true,
      descuento: 15.0,
      metodoPagoPreferido: 'Transferencia',
      comentarios: 'Cliente preferencial, crédito 30 días',
      ultimaCompra: '2024-01-15'
    },
    {
      id: 2,
      nombre: 'Vidrios del Norte S.A.',
      rfc: 'VNO890123456',
      status: 'Activo',
      telefono: '555-0456',
      correo: 'compras@vidriosdelnorte.com',
      direccion: 'Blvd. Industrial 456, Zona Norte',
      saldo: 23750.00,
      precioEspecial: false,
      descuento: 5.0,
      metodoPagoPreferido: 'Cheque',
      comentarios: 'Distribuidor regional',
      ultimaCompra: '2024-01-10'
    },
    {
      id: 3,
      nombre: 'Juan Pérez Construcciones',
      rfc: 'PEXJ850429AB1',
      status: 'Activo',
      telefono: '555-0789',
      correo: 'juan@construcciones.com',
      direccion: 'Calle 5 de Mayo 789, Col. Americana',
      saldo: 0.00,
      precioEspecial: false,
      descuento: 0.0,
      metodoPagoPreferido: 'Efectivo',
      comentarios: 'Cliente de contado',
      ultimaCompra: '2024-01-08'
    }
  ]);

  const handleEdit = (cliente: any) => {
    setEditingItem(cliente);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
      setClientes(clientes.filter(c => c.id !== id));
    }
  };

  const handleSave = (formData: any) => {
    if (editingItem) {
      setClientes(clientes.map(c => c.id === editingItem.id ? { ...c, ...formData } : c));
    } else {
      const newCliente = {
        id: Math.max(...clientes.map(c => c.id)) + 1,
        ultimaCompra: new Date().toISOString().split('T')[0],
        ...formData
      };
      setClientes([...clientes, newCliente]);
    }
    setShowModal(false);
    setEditingItem(null);
  };

  const filteredClientes = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.rfc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSaldoColor = (saldo: number) => {
    if (saldo > 50000) return 'text-red-600';
    if (saldo > 10000) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Catálogo de Clientes</h3>
              <p className="text-sm text-gray-600">Gestión de cartera y datos fiscales</p>
            </div>
          </div>
          <button
            onClick={() => {
              setEditingItem(null);
              setShowModal(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Cliente</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar clientes por nombre, RFC o correo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">Total Clientes</p>
            <p className="text-2xl font-bold text-blue-900">{clientes.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600 font-medium">Clientes Activos</p>
            <p className="text-2xl font-bold text-green-900">
              {clientes.filter(c => c.status === 'Activo').length}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-600 font-medium">Con Precio Especial</p>
            <p className="text-2xl font-bold text-yellow-900">
              {clientes.filter(c => c.precioEspecial).length}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-red-600 font-medium">Cartera Total</p>
            <p className="text-2xl font-bold text-red-900">
              ${clientes.reduce((sum, c) => sum + c.saldo, 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredClientes.map((cliente) => (
            <div key={cliente.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{cliente.nombre}</h4>
                    {cliente.precioEspecial && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        Precio Especial
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 font-mono">{cliente.rfc}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(cliente)}
                    className="p-1 text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cliente.id)}
                    className="p-1 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{cliente.telefono}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{cliente.correo}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{cliente.direccion}</span>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Saldo:</p>
                    <p className={`font-bold ${getSaldoColor(cliente.saldo)}`}>
                      ${cliente.saldo.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Descuento:</p>
                    <p className="font-medium">{cliente.descuento}%</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      cliente.status === 'Activo'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {cliente.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingItem ? 'Editar Cliente' : 'Nuevo Cliente'}
              </h3>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              handleSave({
                nombre: formData.get('nombre'),
                rfc: formData.get('rfc'),
                status: formData.get('status'),
                telefono: formData.get('telefono'),
                correo: formData.get('correo'),
                direccion: formData.get('direccion'),
                saldo: parseFloat(formData.get('saldo') as string) || 0,
                precioEspecial: formData.get('precioEspecial') === 'on',
                descuento: parseFloat(formData.get('descuento') as string) || 0,
                metodoPagoPreferido: formData.get('metodoPagoPreferido'),
                comentarios: formData.get('comentarios')
              });
            }}>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Razón Social / Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    defaultValue={editingItem?.nombre || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    RFC *
                  </label>
                  <input
                    type="text"
                    name="rfc"
                    defaultValue={editingItem?.rfc || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    defaultValue={editingItem?.status || 'Activo'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    defaultValue={editingItem?.telefono || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    name="correo"
                    defaultValue={editingItem?.correo || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección
                  </label>
                  <textarea
                    name="direccion"
                    rows={2}
                    defaultValue={editingItem?.direccion || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Saldo Actual
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="saldo"
                    defaultValue={editingItem?.saldo || 0}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descuento (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="descuento"
                    defaultValue={editingItem?.descuento || 0}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Método de Pago Preferido
                  </label>
                  <select
                    name="metodoPagoPreferido"
                    defaultValue={editingItem?.metodoPagoPreferido || 'Efectivo'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Efectivo">Efectivo</option>
                    <option value="Transferencia">Transferencia</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Tarjeta">Tarjeta</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="precioEspecial"
                      defaultChecked={editingItem?.precioEspecial || false}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Precio Especial</span>
                  </label>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comentarios
                  </label>
                  <textarea
                    name="comentarios"
                    rows={3}
                    defaultValue={editingItem?.comentarios || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;