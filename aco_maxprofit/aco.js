import { Ant } from "./ant.js";

class ACO {
    constructor(n_Ant, n_Dimensi, obj_Function) {
        this.n_Ant = n_Ant;
        this.ants = [];
        this.n_Dimensi = n_Dimensi;
        this.obj_Function = obj_Function;
        this.bestSolution = { fitness: 0, position: [] };
        this.pheromone = Array(this.n_Ant).fill().map(() => Array(this.n_Dimensi).fill(1));
        

        this.initAnts();
    }

    initAnts() {
        for (let i = 0; i < this.n_Ant; i++) {
            const ant = new Ant(this.n_Dimensi, this.obj_Function);
            this.ants.push(ant);
        }
    }

    updatePheromone() {
        const evaporationRate = 0.5; // Tingkat penguapan feromon (50%)
    
        // 1. Penguapan feromon di setiap jalur
        for (let i = 0; i < this.pheromone.length; i++) {
            for (let j = 0; j < this.pheromone[i].length; j++) {
                this.pheromone[i][j] *= (1 - evaporationRate); // Kurangi dengan penguapan
            }
        }
    
        // 2. Deposisi feromon oleh setiap semut
        this.ants.forEach(ant => {
            const fitness = ant.fitness;
             // Fitness dari jalur yang dipilih oleh semut
            ant.position.forEach((pos, dim) => {
                // Tambahkan feromon berdasarkan fitness pada posisi yang telah dikunjungi
                this.pheromone[dim][pos] += fitness;
            });
        });
    
        // 3. Batas atas dan bawah untuk nilai feromon (opsional)
        const minPheromone = 0.1;
        const maxPheromone = 10;
        for (let i = 0; i < this.pheromone.length; i++) {
            for (let j = 0; j < this.pheromone[i].length; j++) {
                // Batasi nilai feromon agar tetap dalam rentang
                this.pheromone[i][j] = Math.max(minPheromone, Math.min(this.pheromone[i][j], maxPheromone));
            }
        }
    }
    

    mainACO() {
        this.ants.forEach((ant) => {
            console.log(ant.position);  // Memeriksa apa yang ada di posisi semut
            ant.choosePath(this.pheromone, 0,1, 0,2);  // Memilih jalur

            console.log("Ant Position:", ant.position);
            console.log("Values passed to maxProfit:", ant.position[0], ant.position[1], ant.position[2]);
            ant.fitness = this.obj_Function(ant.position[0], ant.position[1], ant.position[2]); // Panggil fungsi dengan 3 argumen terpisah
        
            if (ant.fitness > this.bestSolution.fitness) {
                this.bestSolution = { fitness: ant.fitness, position: [...ant.position] };
            }
        });
        
    
        // 2. Memperbarui feromon setelah semua semut selesai bergerak
        this.updatePheromone();
    }
    
    
}

export { ACO };
