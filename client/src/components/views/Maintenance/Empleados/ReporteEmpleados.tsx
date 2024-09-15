import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Empleado } from '../../../../features/empleados/empleadosTypes';
import moment from 'moment';

// Define estilos para el documento PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  header_secondary: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    marginTop: 20,
    borderCollapse: 'collapse',
  },
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 20, // Espacio superior para separar la tabla del título
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 5,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
  },
});

export const ReporteEmpleados = ({
  empleados,
  desde,
  hasta,
}: {
  empleados: Empleado[];
  desde: string | null;
  hasta: string | null;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Reporte de Empleados</Text>

      <Text style={styles.header_secondary}>
        Rango de fechas:{'\n\n'}
        {!!desde && !!hasta
          ? `desde: ${moment(desde).format('DD / MM / YYYY')}\nhasta: ${moment(hasta).format('DD / MM / YYYY')}`
          : !!desde && !hasta
            ? `desde: ${moment(desde).format('DD / MM / YYYY')}\nhasta: ${moment('').format('DD / MM / YYYY')}`
            : `desde: ${moment('').format('DD / MM / YYYY')}\nhasta: ${moment(hasta).format('DD / MM / YYYY')}`}
      </Text>

      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>ID</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Nombre</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Departamento</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Puesto</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Estado</Text>
          </View>
        </View>

        {/* Cuerpo de la tabla */}
        {empleados.map((empleado) => (
          <View style={styles.tableRow} key={empleado.id_empleado}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{empleado.id_empleado}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{empleado.nombre}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{empleado.departamento}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{empleado.puesto}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {empleado.estado ? 'Activo' : 'Inactivo'}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);
