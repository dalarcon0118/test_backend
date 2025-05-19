import { Card } from "antd";

 const DefaultView: React.FC = () => (
    <div>
      <h2>Bienvenido</h2>
      <div className="card-grid">
        <Card title="Cantidad de Estudiantes" bordered={false}>
          <p>Información sobre estudiantes...</p>
        </Card>
        <Card title="Cantidad de Cursos" bordered={false}>
          <p>Información sobre cursos...</p>
        </Card>
        <Card title="% de Matriculados" bordered={false}>
          <p>Información sobre matriculados...</p>
        </Card>
      </div>
    </div>
  );
  export default DefaultView