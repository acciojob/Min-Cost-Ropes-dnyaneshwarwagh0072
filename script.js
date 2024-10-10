function mincost(arr) {
    class MinHeap {
        constructor() {
            this.heap = [];
        }

        insert(val) {
            this.heap.push(val);
            this.bubbleUp();
        }

        bubbleUp() {
            let index = this.heap.length - 1;
            while (index > 0) {
                let element = this.heap[index];
                let parentIndex = Math.floor((index - 1) / 2);
                let parent = this.heap[parentIndex];

                if (parent <= element) break;
                this.heap[index] = parent;
                this.heap[parentIndex] = element;
                index = parentIndex;
            }
        }
        extractMin() {
            const min = this.heap[0];
            const end = this.heap.pop();
            if (this.heap.length > 0) {
                this.heap[0] = end;
                this.sinkDown(0);
            }
            return min;
        }
        sinkDown(index) {
            let length = this.heap.length;
            let element = this.heap[index];
            while (true) {
                let leftChildIndex = 2 * index + 1;
                let rightChildIndex = 2 * index + 2;
                let leftChild, rightChild;
                let swap = null;
                if (leftChildIndex < length) {
                    leftChild = this.heap[leftChildIndex];
                    if (leftChild < element) {
                        swap = leftChildIndex;
                    }
                }
                if (rightChildIndex < length) {
                    rightChild = this.heap[rightChildIndex];
                    if (
                        (swap === null && rightChild < element) ||
                        (swap !== null && rightChild < leftChild)
                    ) {
                        swap = rightChildIndex;
                    }
                }
                if (swap === null) break;
                this.heap[index] = this.heap[swap];
                this.heap[swap] = element;
                index = swap;
            }
        }
        size() {
            return this.heap.length;
        }
    }
    const heap = new MinHeap();
    for (let length of arr) {
        heap.insert(length);
    }
    let totalCost = 0;

    while (heap.size() > 1) {
        let first = heap.extractMin();
        let second = heap.extractMin();

        let cost = first + second;
        totalCost += cost;
        heap.insert(cost);
    }
    return totalCost;
}

console.log(mincost([4, 3, 2, 6]));
console.log(mincost([1, 2, 3, 4, 5]));

module.exports=mincost;
