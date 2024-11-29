import { Ant } from "./ant.js";

export class ACO {
  constructor(nAnts, nCities, distanceMatrix) {
    this.nAnts = nAnts;
    this.nCities = nCities;
    this.distanceMatrix = distanceMatrix;
    this.pheromone = Array.from({ length: nCities }, () =>
      Array(nCities).fill(1)
    );
    this.ants = Array.from({ length: nAnts }, () => new Ant(nCities));
    this.bestSolution = { fitness: Infinity, position: [] };
  }

  updatePheromone() {
    const rho = 0.5; // Evaporation rate
    const Q = 100; // Constant

    // Evaporate pheromone
    for (let i = 0; i < this.nCities; i++) {
      for (let j = 0; j < this.nCities; j++) {
        this.pheromone[i][j] *= 1 - rho;
      }
    }

    // Deposit pheromone
    this.ants.forEach((ant) => {
      const deposit = Q / ant.fitness;
      for (let i = 0; i < ant.position.length - 1; i++) {
        const city1 = ant.position[i];
        const city2 = ant.position[i + 1];
        this.pheromone[city1][city2] += deposit;
        this.pheromone[city2][city1] += deposit; // Symmetric TSP
      }
    });
  }

  mainACO() {
    this.ants.forEach((ant) => {
      ant.findSolution(this.distanceMatrix, this.pheromone);
    });

    this.ants.forEach((ant) => {
      if (ant.fitness < this.bestSolution.fitness) {
        this.bestSolution = {
          fitness: ant.fitness,
          position: [...ant.position],
        };
      }
    });

    this.updatePheromone();
  }
}
