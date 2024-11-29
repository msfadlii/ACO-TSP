import { maxProfit } from "./profit.js";

class Ant {
    constructor(n_Dimensions, objectiveFunction) {
        this.position = Array(n_Dimensions).fill().map(() => Math.random());
        this.fitness = 0;
        this.objectiveFunction = objectiveFunction;
    }

    choosePath(pheromone, alpha, beta) {

        this.position = [
            Math.random(),  // padi
            Math.random(),  // jagung
            Math.random()   // kedelai
        ];
        // For each dimension in the position vector, choose a new position
        this.position = this.position.map((_, dimIndex) => {
            // Get pheromone levels for this dimension
            const pheromoneLevels = pheromone[dimIndex];
            
            // Compute heuristic values (for example, using a simple heuristic based on desirability)
            const heuristicValues = pheromoneLevels.map((_, pos) => 1 / (1 + Math.abs(pos - this.position[dimIndex])));
    
            // Calculate probabilities for each position choice
            const probabilities = pheromoneLevels.map((pheromoneLevel, i) => {
                return Math.pow(pheromoneLevel, alpha) * Math.pow(heuristicValues[i], beta);
            });
    
            // Normalize probabilities
            const sumProbabilities = probabilities.reduce((sum, p) => sum + p, 0);
            const normalizedProbabilities = probabilities.map(p => p / sumProbabilities);
    
            // Select a new position for this dimension based on probabilities
            return this.selectBasedOnProbability(normalizedProbabilities);
        });
    }
    
    // Helper method to select an index based on probabilities
    selectBasedOnProbability(probabilities) {
        const rand = Math.random();
        let cumulative = 0;
    
        for (let i = 0; i < probabilities.length; i++) {
            cumulative += probabilities[i];
            if (rand < cumulative) {
                return i; // return selected index
            }
        }
        return probabilities.length - 1; // fallback to last position
    }
    
}

export { Ant };
