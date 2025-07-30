import React, { useState } from 'react';
import { RefreshCw, Upload, Download, Database, AlertTriangle, CheckCircle, FileText, Settings } from 'lucide-react';

const ProcesosEspeciales: React.FC = () => {
  const [activeProcess, setActiveProcess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [processResult, setProcessResult] = useState<any>(null);

  const procesos = [
    {
      id: 'actualizar-clientes',
      nombre: 'Actualización Masiva de Clientes',
      descripcion: 'Actualizar datos de múltiples clientes simultáneamente',
      categoria: 'Catálogos',
      icon: RefreshCw,
      color: 'blue'
    },
    {
      id: 'actualizar-proveedores',
      nombre: 'Actualización Masiva de Proveedores',
      descripcion: 'Actualizar datos de múltiples proveedores simultáneamente',
      categoria: 'Catálogos',
      icon: RefreshCw,
      color: 'green'
    },
    {
      id: 'cancelar-cfdi',
      nombre: 'Cancelación Masiva de CFDI',
      descripcion: 'Cancelar múltiples facturas en el SAT',
      categoria: 'Facturación',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      id: 'verificar-sellos',
      nombre: 'Verificar Sellos Digitales SAT',
      descripcion: 'Validar integridad de sellos digitales',
      categoria: 'SAT',
      icon: CheckCircle,
      color: 'purple'
    },
    {
      id: 'actualizar-precios',
      nombre: 'Actualización Masiva de Precios',
      descripcion: 'Actualizar precios por porcentaje o archivo Excel',
      categoria: 'Productos',
      icon: Settings,
      color: 'yellow'
    },
    {
      id: 'importar-sat',
      nombre: 'Importar Catálogo SAT',
      descripcion: 'Importar productos y servicios del SAT',
      categoria: 'SAT',
      icon: Download,
      color: 'indigo'
    },
    {
      id: 'reportes-masivos',
      nombre: 'Reportes Masivos de Catálogos',
      descripcion: 'Generar reportes completos de todos los catálogos',
      categoria: 'Reportes',
      icon: FileText,
      color: 'gray'
    },
    {
      id: 'leyenda-fiscal',
      nombre: 'Actualizar Leyenda Fiscal',
      descripcion: 'Modificar leyenda fiscal en facturas',
      categoria: 'Facturación',
      icon: FileText,
      color: 'blue'
    },
    {
      id: 'gestionar-acabados',
      nombre: 'Gestionar Acabados de Productos',
      descripcion: 'Actualización masiva de acabados y colores',
      categoria: 'Productos',
      icon: Settings,
      color: 'purple'
    },
    {
      id: 'importar-minimos-maximos',
      nombre: 'Importar Mínimos/Máximos',
      descripcion: 'Actualizar niveles de inventario desde Excel',
      categoria: 'Inventario',
      icon: Upload,
      color: 'green'
    },
    {
      id: 'exportar-productos-excel',
      nombre: 'Exportar Productos a Excel',
      descripcion: 'Exportar catálogo completo con precios y existencias',
      categoria: 'Productos',
      icon: Download,
      color: 'blue'
    }
  ];

  const handleExecuteProcess = (processId: string) => {
    setActiveProcess(processId);
    setShowModal(true);
  };

  const executeProcess = async (processId: string, params: any) => {
    // Simular ejecución del proceso
    setProcessResult({ status: 'processing', message: 'Ejecutando proceso...' });
    
    setTimeout(() => {
      setProcessResult({
        status: 'success',
        message: 'Proceso completado exitosamente',
        details: {
          processed: Math.floor(Math.random() * 1000) + 100,
          errors: Math.floor(Math.random() * 5),
          warnings: Math.floor(Math.random() * 10)
        }
      });
    }, 3000);
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      green: 'bg-green-50 border-green-200 text-green-800',
      red: 'bg-red-50 border-red-200 text-red-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800',
      gray: 'bg-gray-50 border-gray-200 text-gray-800'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const categorias = [...new Set(procesos.map(p => p.categoria))];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <RefreshCw className="w-6 h-6 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Procesos Especiales</h3>
            <p className="text-sm text-gray-600">Herramientas avanzadas para operaciones masivas y especializadas</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Warning */}
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <p className="text-sm font-medium text-yellow-800">
              Advertencia: Estos procesos pueden afectar grandes cantidades de datos. 
              Asegúrese de tener respaldos antes de ejecutar.
            </p>
          </div>
        </div>

        {/* Process Categories */}
        {categorias.map((categoria) => (
          <div key={categoria} className="mb-8">
            <h4 className="font-semibold text-gray-900 mb-4">{categoria}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {procesos.filter(p => p.categoria === categoria).map((proceso) => {
                const Icon = proceso.icon;
                const colorClasses = getColorClasses(proceso.color);
                
                return (
                  <div key={proceso.id} className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${colorClasses}`}>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium mb-2">{proceso.nombre}</h5>
                        <p className="text-sm opacity-80 mb-3">{proceso.descripcion}</p>
                        <button
                          onClick={() => handleExecuteProcess(proceso.id)}
                          className="w-full px-3 py-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-lg transition-colors font-medium"
                        >
                          Ejecutar Proceso
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Process History */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-4">Historial de Procesos Recientes</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white p-3 rounded-lg">
              <div>
                <span className="font-medium">Actualización Masiva de Precios</span>
                <span className="text-gray-600 ml-2">- 1,250 productos actualizados</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Hace 2 horas</span>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Exitoso</span>
              </div>
            </div>
            <div className="flex items-center justify-between bg-white p-3 rounded-lg">
              <div>
                <span className="font-medium">Importar Catálogo SAT</span>
                <span className="text-gray-600 ml-2">- 5,412 productos importados</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Ayer</span>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Exitoso</span>
              </div>
            </div>
            <div className="flex items-center justify-between bg-white p-3 rounded-lg">
              <div>
                <span className="font-medium">Cancelación Masiva CFDI</span>
                <span className="text-gray-600 ml-2">- 15 facturas canceladas</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Hace 3 días</span>
                <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Con advertencias</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Proceso */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {procesos.find(p => p.id === activeProcess)?.nombre}
              </h3>
            </div>
            
            <div className="p-6">
              {!processResult && (
                <div>
                  {activeProcess === 'actualizar-precios' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Actualización
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                          <option value="percentage">Por Porcentaje</option>
                          <option value="excel">Desde Archivo Excel</option>
                          <option value="manual">Manual por Línea</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Porcentaje de Incremento (%)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="10.5"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Línea de Productos (Opcional)
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                          <option value="">Todas las líneas</option>
                          <option value="vidrios">Vidrios</option>
                          <option value="perfiles">Perfiles</option>
                          <option value="herrajes">Herrajes</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {activeProcess === 'cancelar-cfdi' && (
                    <div className="space-y-4">
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800">
                          <strong>Advertencia:</strong> Esta acción cancelará las facturas seleccionadas en el SAT. 
                          Esta operación no se puede deshacer.
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Rango de Fechas
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <input type="date" className="px-3 py-2 border border-gray-300 rounded-lg" />
                          <input type="date" className="px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Motivo de Cancelación
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                          <option value="01">01 - Comprobante emitido con errores con relación</option>
                          <option value="02">02 - Comprobante emitido con errores sin relación</option>
                          <option value="03">03 - No se llevó a cabo la operación</option>
                          <option value="04">04 - Operación nominativa relacionada en una factura global</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {activeProcess === 'importar-sat' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Catálogo a Importar
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                          <option value="productos">Productos y Servicios</option>
                          <option value="unidades">Unidades de Medida</option>
                          <option value="monedas">Monedas</option>
                          <option value="paises">Países</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Acción con Datos Existentes
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                          <option value="update">Actualizar existentes</option>
                          <option value="skip">Omitir existentes</option>
                          <option value="replace">Reemplazar todos</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {activeProcess === 'verificar-sellos' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Rango de Verificación
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <input type="date" className="px-3 py-2 border border-gray-300 rounded-lg" />
                          <input type="date" className="px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Verificación
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" defaultChecked />
                            <span className="text-sm">Verificar integridad del sello</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" defaultChecked />
                            <span className="text-sm">Validar con SAT</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span className="text-sm">Generar reporte de inconsistencias</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {processResult && (
                <div className="space-y-4">
                  {processResult.status === 'processing' && (
                    <div className="text-center py-8">
                      <RefreshCw className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
                      <p className="text-lg font-medium text-gray-900">{processResult.message}</p>
                      <p className="text-sm text-gray-600">Por favor espere...</p>
                    </div>
                  )}

                  {processResult.status === 'success' && (
                    <div>
                      <div className="text-center py-4">
                        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                        <p className="text-lg font-medium text-green-900">{processResult.message}</p>
                      </div>
                      
                      {processResult.details && (
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-medium text-green-900 mb-2">Resumen del Proceso:</h4>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-green-700">Procesados:</p>
                              <p className="font-bold text-green-900">{processResult.details.processed}</p>
                            </div>
                            <div>
                              <p className="text-yellow-700">Advertencias:</p>
                              <p className="font-bold text-yellow-900">{processResult.details.warnings}</p>
                            </div>
                            <div>
                              <p className="text-red-700">Errores:</p>
                              <p className="font-bold text-red-900">{processResult.details.errors}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setProcessResult(null);
                  setActiveProcess('');
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {processResult ? 'Cerrar' : 'Cancelar'}
              </button>
              {!processResult && (
                <button
                  onClick={() => executeProcess(activeProcess, {})}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ejecutar Proceso
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcesosEspeciales;