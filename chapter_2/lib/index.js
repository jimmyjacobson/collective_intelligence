/*
* data - the dataset of preferences
* key1 - the key for the first datapoint or user
* key2 - the key for the second datapoint or user
*/
function sim_distance (data, user1, user2) {
    //variable to collect the shared items between the two users
    var sharedItems = getSharedItems(data, user1, user2);

    //no shared items, return 0 for the score
    if (Object.keys(sharedItems).length == 0) {
        return 0;
    }

    var sumOfSquares = 0;
    Object.keys(sharedItems).forEach(function(item) {
        sumOfSquares += Math.pow(data[user1][item] - data[user2][item], 2);
    });

    return 1 / (1 + Math.sqrt(sumOfSquares));
}
module.exports.sim_distance = sim_distance;

function sim_pearson(data, user1, user2) {
    var sharedItems = getSharedItems(data, user1, user2);
    var n = Object.keys(sharedItems).length;

    if (n == 0) {
        return 0;
    }

    var sum1 = 0;
    var sum2 = 0;
    var sum1sq = 0;
    var sum2sq = 0;
    var sumProducts = 0;
    Object.keys(sharedItems).forEach(function(item) {
        sum1 += data[user1][item];
        sum1sq += Math.pow(data[user1][item], 2);
        sum2 += data[user2][item];
        sum2sq += Math.pow(data[user2][item], 2);
        sumProducts += data[user1][item] * data[user2][item];
    });

    var num = sumProducts - (sum1 * sum2 / n);
    var den = Math.sqrt((sum1sq - Math.pow(sum1, 2) / n) * (sum2sq - Math.pow(sum2, 2) / n));

    if (den == 0) {
        return 0;
    }

    return num / den;
}
module.exports.sim_pearson = sim_pearson;

function top_matches(data, user1, n, similarityFunction) {
    var scores = [];
   Object.keys(data).forEach(function(user2) {
        if (user1 != user2) {
            var score = similarityFunction(data, user1, user2);
           scores.push({"name": user2, "score": score});
        }
    });

    scores.sort(function(a, b) {
        return b.score - a.score;
    });

    return scores.slice(0, n);
}
module.exports.top_matches = top_matches;

function getSharedItems(data, user1, user2) {
    var sharedItems = {};

    // iteratre over the preferences for user 1 and compare to user 2
    Object.keys(data[user1]).forEach(function(datapoint) {
        //if the both have the same preference, store the key in sharedItems
        if (data[user2][datapoint]) {
            sharedItems[datapoint] = 1
        }
    })

    return sharedItems;
}