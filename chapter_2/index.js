const data = require('./recommendations.js');
const algos = require('./lib');


console.log("Distance: ", algos.sim_distance(data, 'Lisa Rose', 'Gene Seymour'));
console.log("Pearson: ", algos.sim_pearson(data, 'Lisa Rose', 'Gene Seymour'));
console.log("Top Matches", algos.top_matches(data, 'Toby', 3, algos.sim_pearson));