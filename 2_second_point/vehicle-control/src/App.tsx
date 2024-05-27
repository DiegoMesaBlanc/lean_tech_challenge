import { useEffect, useState } from 'react';
import './App.css';
import Vehicle from './Vehicule';


function App() {
  const [commands, setCommands] = useState<string>('');
  const [output, setOutput] = useState<string[]>([]);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [matrix, setMatrix] = useState<number[][]>([]);

  const n: number = 5; // número de filas
  const m: number = 5; // número de columnas

  useEffect(() => {
    const initialMatrix = Array.from({ length: n }, () => Array(m).fill(0));

    setMatrix(initialMatrix);
    setVehicle(new Vehicle(m - 1, n - 1));

    if (vehicle) updateMatrix(vehicle.getCurrentPosition());
  }, [vehicle]);

  const handleExecuteCommands = () => {
    if (vehicle) {
      const results = vehicle.processCommands(commands);

      setOutput(results);
      setHistory(vehicle.getHistory());
      updateMatrix(vehicle.getCurrentPosition());
    }
  };

  const updateMatrix = (position: string) => {
    const [row, col] = position.slice(1, -1).split(', ').map(Number);
    const newMatrix = Array.from({ length: n }, () => Array(m).fill(0));

    newMatrix[n - 1 - row][col] = 1;

    setMatrix(newMatrix);
  };

  return (
    <div className="App">
      <h1>Control de Movimiento de Vehículo</h1>

      <div>
        <label>
          Comandos (formato: pasos,direccion;...):
          <input
            type="text"
            value={commands}
            onChange={(e) => setCommands(e.target.value)}
          />
        </label>

        <button onClick={handleExecuteCommands}>Ejecutar Comandos</button>
      </div>

      <div>
        <h2>Resultado (s):</h2>

        <ul>
          {output.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Historial de Comandos:</h2>

        <ul>
          {history.map((cmd, index) => (
            <li key={index}>{cmd}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Visualización de la Matriz:</h2>

        <div className="matrix">
          {matrix.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className={`cell ${cell === 1 ? 'vehicle' : ''}`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
