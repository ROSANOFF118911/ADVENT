import React, { useState } from 'react';
import { FileSpreadsheet, Upload, Download, Database, AlertCircle, CheckCircle } from 'lucide-react';

const ImportExport: React.FC = () => {
  const [activeTab, setActiveTab] = useState('import');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<any>(null);

  const importTemplates = [
    {
      id: 'clientes',
      nombre: 'Clientes',
      descripcion: 'Importar datos de clientes desde Excel/CSV',
      campos: ['nombre', 'rfc', 'telefono', 'correo', 'direccion', 'saldo', 'descuento'],
      ejemplo: 'clientes_template.xlsx'
    },
    {
      id: 'proveedores',
      nombre: 'Proveedores',
      descripcion: 'Importar datos de proveedores desde Excel/CSV',
      campos: ['nombre', 'rfc', 'telefono', 'correo', 'direccion', 'condiciones_credito'],
      ejemplo: 'proveedores_template.xlsx'
    },
    {
      id: 'productos',
      nombre: 'Productos',
      descripcion: 'Importar catálogo de productos desde Excel/CSV',
      campos: ['codigo', 'descripcion', 'linea', 'precio_base', 'costo', 'stock_min', 'stock_max'],
      ejemplo: 'productos_template.xlsx'
    },
    {
      id: 'precios',
      nombre: 'Precios',
      descripcion: 'Actualizar precios de productos masivamente',
      campos: ['codigo', 'precio_base', 'costo', 'descuento'],
      ejemplo: 'precios_template.xlsx'
    },
    {
      id: 'inventario',
      nombre: 'Inventario',
      descripcion: 'Importar existencias y mínimos/máximos',
      campos: ['codigo', 'stock_actual', 'stock_min', 'stock_max', 'ubicacion'],
      ejemplo: 'inventario_template.xlsx'
    },
    {
      id: 'pedidos',
      nombre: 'Pedidos',
      descripcion: 'Importar pedidos desde sistemas externos',
      campos: ['cliente_rfc', 'fecha_entrega', 'productos', 'cantidades', 'precios'],
      ejemplo: 'pedidos_template.xlsx'
    },
    {
      id: 'minimos-maximos',
      nombre: 'Mínimos y Máximos',
      descripcion: 'Actualizar niveles de inventario mínimos y máximos',
      campos: ['codigo', 'stock_min', 'stock_max', 'punto_reorden'],
      ejemplo: 'minimos_maximos_template.xlsx'
    },
    {
      id: 'acabados',
      nombre: 'Acabados de Productos',
      descripcion: 'Importar acabados y colores disponibles',
      campos: ['nombre', 'descripcion', 'color', 'tipo', 'costo_adicional'],
      ejemplo: 'acabados_template.xlsx'
    }
  ];

  const exportOptions = [
    {
      id: 'clientes-completo',
      nombre: 'Clientes Completo',
      descripcion: 'Exportar todos los datos de clientes',
      formato: ['Excel', 'CSV', 'PDF']
    },
    {
      id: 'productos-completo',
      nombre: 'Productos Completo',
      descripcion: 'Exportar catálogo completo de productos',
      formato: ['Excel', 'CSV', 'PDF']
    },
    {
      id: 'inventario-actual',
      nombre: 'Inventario Actual',
      descripcion: 'Exportar existencias actuales por almacén',
      formato: ['Excel', 'CSV']
    },
    {
      id: 'ventas-periodo',
      nombre: 'Ventas por Período',
      descripcion: 'Exportar reporte de ventas por fechas',
      formato: ['Excel', 'PDF']
    },
    {
      id: 'cartera-clientes',
      nombre: 'Cartera de Clientes',
      descripcion: 'Exportar saldos y antigüedad de cartera',
      formato: ['Excel', 'PDF']
    },
    {
      id: 'cuentas-pagar',
      nombre: 'Cuentas por Pagar',
      descripcion: 'Exportar saldos pendientes a proveedores',
      formato: ['Excel', 'PDF']
    }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImport = async (templateId: string) => {
    if (!selectedFile) {
      alert('Por favor seleccione un archivo');
      return;
    }

    setImportResult({ status: 'processing', message: 'Procesando archivo...' });

    // Simular procesamiento
    setTimeout(() => {
      const processed = Math.floor(Math.random() * 500) + 100;
      const errors = Math.floor(Math.random() * 10);
      const warnings = Math.floor(Math.random() * 20);

      setImportResult({
        status: 'success',
        message: 'Importación completada',
        details: {
          processed,
          errors,
          warnings,
          template: templateId,
          filename: selectedFile.name
        }
      });
    }, 3000);
  };

  const handleExport = (exportId: string, formato: string) => {
    alert(`Exportando ${exportId} en formato ${formato}...`);
    // Aquí iría la lógica real de exportación
  };

  const downloadTemplate = (templateId: string) => {
    alert(`Descargando plantilla: ${templateId}_template.xlsx`);
    // Aquí iría la lógica para descargar la plantilla
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <FileSpreadsheet className="w-6 h-6 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Importar/Exportar Datos</h3>
            <p className="text-sm text-gray-600">Herramientas para importación y exportación masiva de datos</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
          <button
            onClick={() => setActiveTab('import')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'import'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Importar Datos
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'export'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Exportar Datos
          </button>
        </div>

        {activeTab === 'import' && (
          <div>
            {/* File Upload Area */}
            <div className="mb-6 p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-lg font-medium text-gray-900 mb-2">Seleccionar Archivo</p>
              <p className="text-sm text-gray-600 mb-4">
                Soporta archivos Excel (.xlsx, .xls) y CSV (.csv)
              </p>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                Seleccionar Archivo
              </label>
              {selectedFile && (
                <p className="mt-2 text-sm text-green-600">
                  Archivo seleccionado: {selectedFile.name}
                </p>
              )}
            </div>

            {/* Import Templates */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {importTemplates.map((template) => (
                <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{template.nombre}</h4>
                    <Database className="w-5 h-5 text-blue-600" />
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{template.descripcion}</p>
                  
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Campos requeridos:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.campos.slice(0, 4).map((campo, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          {campo}
                        </span>
                      ))}
                      {template.campos.length > 4 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          +{template.campos.length - 4} más
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => downloadTemplate(template.id)}
                      className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      Descargar Plantilla
                    </button>
                    <button
                      onClick={() => handleImport(template.id)}
                      disabled={!selectedFile}
                      className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
                    >
                      Importar {template.nombre}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Import Result */}
            {importResult && (
              <div className="mt-6 p-4 border rounded-lg">
                {importResult.status === 'processing' && (
                  <div className="text-center py-4">
                    <Database className="w-8 h-8 text-blue-600 mx-auto mb-2 animate-pulse" />
                    <p className="font-medium text-gray-900">{importResult.message}</p>
                  </div>
                )}

                {importResult.status === 'success' && (
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <p className="font-medium text-green-900">{importResult.message}</p>
                    </div>
                    
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-green-700">Procesados:</p>
                          <p className="font-bold text-green-900">{importResult.details.processed}</p>
                        </div>
                        <div>
                          <p className="text-yellow-700">Advertencias:</p>
                          <p className="font-bold text-yellow-900">{importResult.details.warnings}</p>
                        </div>
                        <div>
                          <p className="text-red-700">Errores:</p>
                          <p className="font-bold text-red-900">{importResult.details.errors}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'export' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exportOptions.map((option) => (
                <div key={option.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{option.nombre}</h4>
                    <Download className="w-5 h-5 text-green-600" />
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{option.descripcion}</p>
                  
                  <div className="space-y-2">
                    {option.formato.map((formato) => (
                      <button
                        key={formato}
                        onClick={() => handleExport(option.id, formato)}
                        className={`w-full px-3 py-2 rounded-lg transition-colors text-sm ${
                          formato === 'Excel' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                          formato === 'PDF' ? 'bg-red-100 text-red-700 hover:bg-red-200' :
                          'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                      >
                        Exportar como {formato}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Export History */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-4">Exportaciones Recientes</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                  <div>
                    <span className="font-medium">Clientes Completo</span>
                    <span className="text-gray-600 ml-2">- Excel (892 registros)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Hace 1 hora</span>
                    <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                      Descargar
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                  <div>
                    <span className="font-medium">Inventario Actual</span>
                    <span className="text-gray-600 ml-2">- CSV (2,847 productos)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Ayer</span>
                    <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                      Descargar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportExport;