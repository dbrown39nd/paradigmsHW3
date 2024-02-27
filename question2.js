
/* 
Only able to
1) Completely Fill Bottle
2) Empty Bottle completely
3) Pour until one bottle is empty or the other is full

* Target amount must be all in 1 bottle

*/


function solve(amount, bottles){


    if (Math.max(...bottles) < amount){
        return null; //if amount is larger than the largest capacity, return 
    }
    //Steps always start with empty bottles
    let len = bottles.length;
    let initialState = new Array(len).fill(0); //Initialize empty array
    /* Declare Helper Functions */
    let fill  = (b, state) => state[b] = bottles[b];  
    let empty = (b, state) => state[b] = 0; //Takes index of bottle for currState
    let transfer = (filler, filled, state) => { //This function takes in two bottles, the bottle doing the filling and the bottle being filled. These are indicies to the bottles array. 
        let currVolumeFiller = state[filler];
        let currVolumeFilled = state[filled];
        let fillerCapacity = bottles[filler];
        let filledCapacity = bottles[filled];

        if( (currVolumeFiller === 0) || (currVolumeFilled == filledCapacity) ){
            return null; /* Can't transfer from a cup with 0 volume or a cup wht full volume can't receive anymore */
        }

        let diff = currVolumeFiller - (filledCapacity - currVolumeFilled); //Diff represents how much is left over after potential transfer. 
        if (diff > 0){ //This means their will be some still left in the cup filling other to the capacity
            state[filled] = filledCapacity;
            state[filler] = diff; 
        }
        else if(diff <= 0){ //Full transfer from one cup to another
            state[filled] = state[filled] + currVolumeFiller;
            state[filler] = 0; 
        }


        //return new state as an array

        return state;
    }; 


    /* Create and Traverse Graph at the same time (DFS)*/
    let visited = new Set();
    let queue = [[[...initialState], [[...initialState]]]]; // Each element is [currState, pathToState]. This makes it easier to track where we find the solution in the dfs.
    /* Do a DFS */
    while(queue.length > 0){
        let [currState, pathToState] = queue.shift();
        if(visited.has(currState.join(","))) continue; /* Don't repeat search NEED TO USE STRINGS */ 
        visited.add(currState.join(","));//Add to visited because we are now checking if its the final node
        
        if (currState.find((x) => x == amount)){ /* Check if one of the bottles has the desired amount */
            /* loop through bottles, empty each and add that state.*/
            let finalState = currState.slice(); //Need to make copy of currState because of the way JS handles memory in arrays.
            for (let i = 0; i < len; i++){
                if (currState[i] != amount && currState[i] != 0){
                    empty(i, finalState); //empty that bottle
                    let copy = finalState.slice();
                    pathToState.push(copy);
                }
            }
            return pathToState;
        }

        /* Generate all permutations now */
        //Fill each cup
        let indexOfInsertion = 0; //Used for DFS functionality
        for(let i = 0; i < len; i++){
            if(currState[i] != bottles[i]){ //If its not already at capacity (NOT NECESARY)
                let copyState = currState.slice();
                fill(i, copyState);
                if(!visited.has(copyState.join(","))){ //don't add if we already generated this node. (Sort of redundant)
                    queue.splice(indexOfInsertion, 0, [copyState, [...pathToState, copyState]]);
                    indexOfInsertion+=1;
                }
            }
        }

        //Transfer liquids from each cup to another
        for(let i = 0; i < len; i++){
            for(let j = 0; j < len; j++){
                if(i == j) continue; //Don't transfer from eg. b[0]->b[0]
                let copyState = currState.slice();
                let transferState = transfer(i, j, copyState);
                if(transferState === null) continue;
                if(!visited.has(transferState.join(","))){ //don't add if we already visited this same node
                    queue.splice(indexOfInsertion, 0, [transferState, [...pathToState, transferState]]);
                    indexOfInsertion+=1;
                }   
            }
            
        }

        
        

    }
    return null; 



}



//console.log(solve(2, [5,3])); /* Should return an array with the steps -> [ [0, 0], [5,0], [2,3], [2,0] ]*/

