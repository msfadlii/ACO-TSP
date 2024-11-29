export class Particle {
  constructor(route, fitness) {
    this.position = route; // Posisi partikel (rute)
    this.velocity = []; // Kecepatan (tidak digunakan langsung dalam TSP)
    this.fitness = fitness; // Fitness saat ini
    this.pbestPosition = [...route]; // Posisi terbaik lokal
    this.pbestFitness = fitness; // Fitness terbaik lokal
  }

  // Fungsi untuk memperbarui posisi partikel berdasarkan rute referensi
  updatePosition(reference) {
    const newPosition = [...this.position];

    // Pertukaran acak berdasarkan referensi
    this.randomSwap(newPosition, reference);

    // Pastikan kota awal dan akhir tetap sama
    newPosition[0] = 0; // Kota awal (Surabaya)
    newPosition[newPosition.length - 1] = 0; // Kota akhir (Surabaya)

    return newPosition;
  }

  // Fungsi pertukaran acak dua kota di dalam rute
  randomSwap(route, reference) {
    const index1 = Math.floor(Math.random() * (route.length - 2)) + 1;
    const index2 = Math.floor(Math.random() * (route.length - 2)) + 1;

    if (reference[index1] !== route[index1]) {
      [route[index1], route[index2]] = [route[index2], route[index1]];
    }
  }
}
