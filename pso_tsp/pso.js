import { Particle } from "./particle.js";

export class PSO {
  constructor(nParticles, nCities, distanceMatrix) {
    this.nParticles = nParticles; // Jumlah partikel
    this.nCities = nCities; // Jumlah kota
    this.distanceMatrix = distanceMatrix; // Matriks jarak antar kota
    this.particles = []; // Daftar partikel
    this.gbestPosition = []; // Posisi terbaik global
    this.gbestFitness = Infinity; // Fitness terbaik global

    // Inisialisasi partikel
    this.initializeParticles();
  }

  // Fungsi untuk inisialisasi partikel
  initializeParticles() {
    for (let i = 0; i < this.nParticles; i++) {
      // Membuat rute acak (tidak termasuk kota awal)
      const randomRoute = [...Array(this.nCities - 1).keys()].map((x) => x + 1);
      this.shuffleArray(randomRoute);

      // Menambahkan kota awal (0) di awal dan akhir
      const route = [0, ...randomRoute, 0];
      const fitness = this.calculateFitness(route);

      const particle = new Particle(route, fitness);

      this.particles.push(particle);

      // Perbarui gbest
      if (particle.fitness < this.gbestFitness) {
        this.gbestFitness = particle.fitness;
        this.gbestPosition = [...particle.position];
      }
    }
  }

  // Fungsi menghitung fitness
  calculateFitness(route) {
    let totalDistance = 0;
    for (let i = 0; i < route.length - 1; i++) {
      totalDistance += this.distanceMatrix[route[i]][route[i + 1]];
    }
    return totalDistance;
  }

  // Fungsi untuk mengacak array
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Algoritma utama PSO
  mainPSO() {
    this.particles.forEach((particle) => {
      // Update posisi berdasarkan gbest
      const newPosition = particle.updatePosition(this.gbestPosition);

      const newFitness = this.calculateFitness(newPosition);

      // Perbarui partikel
      particle.position = newPosition;
      particle.fitness = newFitness;

      // Update pbest
      if (newFitness < particle.pbestFitness) {
        particle.pbestFitness = newFitness;
        particle.pbestPosition = [...newPosition];
      }

      // Update gbest
      if (newFitness < this.gbestFitness) {
        this.gbestFitness = newFitness;
        this.gbestPosition = [...newPosition];
      }
    });
  }
}
