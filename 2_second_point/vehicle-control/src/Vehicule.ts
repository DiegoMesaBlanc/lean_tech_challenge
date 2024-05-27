export type Direction = 'N' | 'S' | 'E' | 'O';


interface Command {
  execute(): string;
}


class MoveCommand implements Command {
  private vehicle: Vehicle;
  private steps: number;
  private direction: Direction;

  constructor(
    vehicle: Vehicle,
    steps: number,
    direction: Direction
  ) {
    this.vehicle = vehicle;
    this.steps = steps;
    this.direction = direction;
  }

  execute(): string {
    return this.vehicle.move(this.steps, this.direction);
  }
}


class Vehicle {
  private x: number;
  private y: number;
  private maxX: number;
  private maxY: number;
  private commandHistory: string[];

  constructor(
    maxX: number,
    maxY: number
  ) {
    this.x = 0;
    this.y = 0;
    this.maxX = maxX;
    this.maxY = maxY;
    this.commandHistory = [];
  }

  private isWithinBounds(x: number, y: number): boolean {
    return x >= 0 && x <= this.maxX && y >= 0 && y <= this.maxY;
  }

  public move(steps: number, direction: Direction): string {
    let newX = this.x;
    let newY = this.y;

    switch (direction) {
      case 'N':
        newY += steps;
        break;
      case 'S':
        newY -= steps;
        break;
      case 'E':
        newX += steps;
        break;
      case 'O':
        newX -= steps;
        break;
      default:
        return 'Dirección no válida';
    }

    if (!this.isWithinBounds(newX, newY)) {
      return 'Se ha detenido el avance por salir de los límites';
    }

    this.x = newX;
    this.y = newY;

    const position = `(${this.y}, ${this.x})`;
    this.commandHistory.push(`${steps},${direction} -> ${position}`);

    return position;
  }

  public processCommands(commands: string): string[] {
    const commandList = commands.split(';');
    const results: string[] = [];

    for (const command of commandList) {
      const [steps, direction] = command.split(',');
      const moveCommand = new MoveCommand(this, parseInt(steps), direction as Direction);
      const result = moveCommand.execute();

      results.push(`Comando: ${command}, Resultado: ${result}`);

      if (result.includes('Se ha detenido')) break;
    }

    return results;
  }

  public getCurrentPosition(): string {
    return `(${this.y}, ${this.x})`;
  }

  public getHistory(): string[] {
    return this.commandHistory;
  }
}

export default Vehicle;

