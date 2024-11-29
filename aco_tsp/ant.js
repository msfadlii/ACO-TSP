export class Ant {
  constructor(nCities) {
    this.position = [];
    this.fitness = 2;
    this.visitedCities = new Set();
    this.nCities = nCities;
  }

  findSolution(distanceMatrix, pheromone) {
    this.position = [];
    this.visitedCities.clear();

    // Mulai dari kota pertama (misalnya Surabaya, kota 0)
    let currentCity = 0; // Mulai dari kota pertama (0)
    this.position.push(currentCity);
    this.visitedCities.add(currentCity);

    // Mengunjungi semua kota lainnya
    for (let step = 1; step < this.nCities; step++) {
      const nextCity = this.selectNextCity(
        currentCity,
        pheromone,
        distanceMatrix
      );
      this.position.push(nextCity);
      this.visitedCities.add(nextCity);
      currentCity = nextCity;
    }

    // Kembali ke kota pertama (Surabaya, kota 0)
    this.position.push(this.position[0]);

    // Hitung fitness setelah rute selesai
    this.fitness = this.calculateFitness(distanceMatrix);
  }

  selectNextCity(currentCity, pheromone, distanceMatrix) {
    const probabilities = [];
    let total = 0;

    // Hitung probabilitas berdasarkan pheromone dan jarak
    for (let i = 0; i < this.nCities; i++) {
      if (!this.visitedCities.has(i)) {
        const pheromoneLevel = pheromone[currentCity][i];
        const distance = distanceMatrix[currentCity][i];
        const probability = pheromoneLevel / Math.pow(distance, 2); // Bobot pheromone / jarak kuadrat
        probabilities.push({ city: i, probability });
        total += probability;
      }
    }

    // Pilih kota berdasarkan probabilitas
    let random = Math.random() * total;
    for (let i = 0; i < probabilities.length; i++) {
      random -= probabilities[i].probability;
      if (random <= 0) {
        return probabilities[i].city;
      }
    }

    return probabilities[0].city; // Fallback
  }

  calculateFitness(distanceMatrix) {
    let totalDistance = 0;
    for (let i = 0; i < this.position.length - 1; i++) {
      totalDistance += distanceMatrix[this.position[i]][this.position[i + 1]];
    }
    return totalDistance;
  }
}
